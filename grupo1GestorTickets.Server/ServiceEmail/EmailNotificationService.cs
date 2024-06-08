using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using grupo1GestorTickets.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace grupo1GestorTickets.Server.ServiceEmail
{
    public class EmailNotificationService
    {
        private readonly TicketsCTX _context;
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUser = "gestion.ticket.grupo01@gmail.com";
        private readonly string _smtpPass = "rugl rtch bkyw vcsv";

        public EmailNotificationService(TicketsCTX context)
        {
            _context = context;
        }

        public async Task SendNotification(string email, int ticketId)
        {
            var ticket = await (from t in _context.Tickets
                                join a in _context.Areas on t.IdArea equals a.Id
                                where t.Id == ticketId
                                select new
                                {
                                    t.Id,
                                    t.Nombre,
                                    t.Descripcion,
                                    t.Prioridad,
                                    Area = a.Nombre,
                                    FechaCreacion = t.FechaCreacion
                                }).FirstOrDefaultAsync();

            if (ticket == null)
            {
                throw new Exception("Ticket not found");
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("System Ticket", _smtpUser));
            message.To.Add(new MailboxAddress("User", email));
            message.Subject = "Ticket Creado";

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"
     <html>
    <head>
        <style>
            .card {{
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                width: 70%; /* Adjusted width to make the card smaller */
                max-width: 500px; /* Adjusted max-width to make the card smaller */
                margin: auto;
                background-color: #000;
                color: #fff;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 20px;
                font-family: Arial, sans-serif;
            }}
            .card h1 {{
                color: white;
                font-size: 24px;
            }}
            .card p {{
                color: white;
                font-size: 18px;
            }}
            .card img {{
                width: 100%;
                height: auto;
                border-radius: 10px;
            }}
        </style>
    </head>
    <body>
        <div class='card'>
            <h1>Ticket Creado</h1>
            <p>Su ticket ha sido creado correctamente.</p>
            <p><strong>Número de Ticket:</strong> {ticket.Id}</p>
            <p><strong>Nombre:</strong> {ticket.Nombre}</p>
            <p><strong>Descripción:</strong> {ticket.Descripcion}</p>
            <p><strong>Prioridad:</strong> {ticket.Prioridad}</p>
            <p><strong>Área:</strong> {ticket.Area}</p>
            <p><strong>Fecha de Creación:</strong> {ticket.FechaCreacion}</p>
            <p><img src='https://i.ibb.co/C2Nxxyb/2-P-ginas-Web-Gestor-de-Proyecto-Final.png' alt='Logo'></p>
        </div>
    </body>
    </html>";


            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public async Task SendNotificationToAdmins(int ticketId)
        {
            var ticket = await (from t in _context.Tickets
                                join a in _context.Areas on t.IdArea equals a.Id
                                where t.Id == ticketId
                                select new
                                {
                                    t.Id,
                                    t.Nombre,
                                    t.Descripcion,
                                    t.Prioridad,
                                    Area = a.Nombre,
                                    FechaCreacion = t.FechaCreacion
                                }).FirstOrDefaultAsync();

            if (ticket == null)
            {
                throw new Exception("Ticket not found");
            }

            var admins = await _context.Usuarios.Where(u => u.tipo_usuario == 1).ToListAsync();

            foreach (var admin in admins)
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("System Ticket", _smtpUser));
                message.To.Add(new MailboxAddress("Admin", admin.Correo));
                message.Subject = "Nuevo Ticket Sin Asignar";

                var bodyBuilder = new BodyBuilder();
                var assignUrl = $"https://localhost:5173/login";
                bodyBuilder.HtmlBody = $@"
        <html>
        <head>
            <style>
                .card {{
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    width: 80%;
                    max-width: 600px;
                    margin: auto;
                    background-color: #000;
                    color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }}
                .card h1 {{
                    font-size: 24px;
                    color:white;

                }}
                .card p {{
                    color:white;
                    font-size: 18px;
                }}
                .card img {{
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }}
                .button {{
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    outline: none;
                    color: #000;
                    background-color: transparent;
                    border: 2px solid #00ff00; /* Green border */
                    border-radius: 15px;
                    transition: background-color 0.3s, color 0.3s;
                }}
                .button:hover {{
                    background-color: #898929; /* Green background */
                    color: #fff;
                }}
            </style>
        </head>
        <body>
            <div class='card'>
                <h1>¡Nuevo Ticket Sin Asignar!</h1>
                <p>Se ha creado un nuevo ticket de un cliente sin asignar.</p>
                <p><strong>Número de Ticket:</strong> {ticket.Id}</p>
                <p><strong>Nombre:</strong> {ticket.Nombre}</p>
                <p><strong>Descripción:</strong> {ticket.Descripcion}</p>
                <p><strong>Prioridad:</strong> {ticket.Prioridad}</p>
                <p><strong>Área:</strong> {ticket.Area}</p>
                <p><strong>Fecha de Creación:</strong> {ticket.FechaCreacion}</p>
                <p><img src='https://i.ibb.co/C2Nxxyb/2-P-ginas-Web-Gestor-de-Proyecto-Final.png' alt='Logo'></p>
                <a href='{assignUrl}' class='button'>Asignar Ya</a>
            </div>
        </body>
        </html>";

                message.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(_smtpUser, _smtpPass);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
        // Notify Admins on Ticket State Change by Assigned User
        public async Task NotifyAdminsOnStateChange(int ticketId)
        {
            var ticket = await GetTicketDetails(ticketId);

            if (ticket == null)
            {
                throw new Exception("Ticket not found");
            }

            var admins = await _context.Usuarios.Where(u => u.tipo_usuario == 1).ToListAsync();

            foreach (var admin in admins)
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("System Ticket", _smtpUser));
                message.To.Add(new MailboxAddress("Admin", admin.Correo));
                message.Subject = "Cambio de Estado del Ticket";

                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = $@"
                <html>
                    <head>
                        <style>
                            .card {{
                                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                                transition: 0.3s;
                                width: 80%;
                                max-width: 600px;
                                margin: auto;
                                background-color: #000;
                                color: #fff;
                                border: 1px solid #ccc;
                                border-radius: 10px;
                                padding: 20px;
                                font-family: Arial, sans-serif;
                            }}
                            .card h1 {{
                                font-size: 24px;
                                color: white;
                            }}
                            .card p {{
                                color: white;
                                font-size: 18px;
                            }}
                            .card img {{
                                width: 100%;
                                height: auto;
                                border-radius: 10px;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='card'>
                            <h1>Cambio de Estado del Ticket</h1>
                            <p>El estado del ticket ha sido cambiado por el usuario asignado.</p>
                            <p><strong>Número de Ticket:</strong> {ticket.Id}</p>
                            <p><strong>Nombre:</strong> {ticket.Nombre}</p>
                            <p><strong>Estado:</strong> {ticket.NameEstado}</p>
                            <p><strong>Descripción:</strong> {ticket.Descripcion}</p>
                            <p><strong>Prioridad:</strong> {ticket.Prioridad}</p>
                            <p><strong>Área:</strong> {ticket.Area}</p>
                            <p><strong>Fecha de Creación:</strong> {ticket.FechaCreacion}</p>
                            <p><img src='https://i.ibb.co/C2Nxxyb/2-P-ginas-Web-Gestor-de-Proyecto-Final.png' alt='Logo'></p>
                        </div>
                    </body>
                </html>";

                message.Body = bodyBuilder.ToMessageBody();

                await SendEmailAsync(message);
            }
        }

        // Notify Ticket Owner on Ticket State Change
        public async Task NotifyUserOnStateChange(int ticketId)
        {
            var ticket = await GetTicketDetails(ticketId);

            if (ticket == null)
            {
                throw new Exception("Ticket not found");
            }

            var user = await _context.Usuarios.FindAsync(ticket.IdUsuario);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("System Ticket", _smtpUser));
            message.To.Add(new MailboxAddress("User", user.Correo));
            message.Subject = "Cambio de Estado del Ticket";

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"
            <html>
                <head>
                    <style>
                        .card {{
                            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                            transition: 0.3s;
                            width: 70%;
                            max-width: 500px;
                            margin: auto;
                            background-color: #000;
                            color: #fff;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                            padding: 20px;
                            font-family: Arial, sans-serif;
                        }}
                        .card h1 {{
                            color: white;
                            font-size: 24px;
                        }}
                        .card p {{
                            color: white;
                            font-size: 18px;
                        }}
                        .card img {{
                            width: 100%;
                            height: auto;
                            border-radius: 10px;
                        }}
                    </style>
                </head>
                <body>
                    <div class='card'>
                        <h1>Cambio de Estado del Ticket</h1>
                        <p>El estado de su ticket ha sido cambiado.</p>
                        <p><strong>Número de Ticket:</strong> {ticket.Id}</p>
                        <p><strong>Nombre:</strong> {ticket.Nombre}</p>
                        <p><strong>Estado:</strong> {ticket.NameEstado}</p>
                        <p><strong>Descripción:</strong> {ticket.Descripcion}</p>
                        <p><strong>Prioridad:</strong> {ticket.Prioridad}</p>
                        <p><strong>Área:</strong> {ticket.Area}</p>
                        <p><strong>Fecha de Creación:</strong> {ticket.FechaCreacion}</p>
                        <p><img src='https://i.ibb.co/C2Nxxyb/2-P-ginas-Web-Gestor-de-Proyecto-Final.png' alt='Logo'></p>
                    </div>
                </body>
            </html>";

            message.Body = bodyBuilder.ToMessageBody();

            await SendEmailAsync(message);
        }

        // Notify Assigned User on Ticket Assignment
        public async Task NotifyAssignedUser(int ticketId)
        {
            var ticket = await GetTicketDetails(ticketId);

            if (ticket == null)
            {
                throw new Exception("Ticket not found");
            }

            var assignedUser = await _context.Usuarios.FindAsync(ticket.IdUsuarioAsignado);

            if (assignedUser == null)
            {
                throw new Exception("Assigned user not found");
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("System Ticket", _smtpUser));
            message.To.Add(new MailboxAddress("User", assignedUser.Correo));
            message.Subject = "Nuevo Ticket Asignado";

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"
            <html>
                <head>
                    <style>
                        .card {{
                            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                            transition: 0.3s;
                            width: 70%;
                            max-width: 500px;
                            margin: auto;
                            background-color: #000;
                            color: #fff;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                            padding: 20px;
                            font-family: Arial, sans-serif;
                        }}
                        .card h1 {{
                            color: white;
                            font-size: 24px;
                        }}
                        .card p {{
                            color: white;
                            font-size: 18px;
                        }}
                        .card img {{
                            width: 100%;
                            height: auto;
                            border-radius: 10px;
                        }}
                    </style>
                </head>
                <body>
                    <div class='card'>
                        <h1>Nuevo Ticket Asignado</h1>
                        <p>Se le ha asignado un nuevo ticket para trabajar y darle solución.</p>
                        <p><strong>Número de Ticket:</strong> {ticket.Id}</p>
                        <p><strong>Nombre:</strong> {ticket.Nombre}</p>
                        <p><strong>Descripción:</strong> {ticket.Descripcion}</p>
                        <p><strong>Prioridad:</strong> {ticket.Prioridad}</p>
                        <p><strong>Área:</strong> {ticket.Area}</p>
                        <p><strong>Fecha de Creación:</strong> {ticket.FechaCreacion}</p>

                       <p><img src='https://i.ibb.co/C2Nxxyb/2-P-ginas-Web-Gestor-de-Proyecto-Final.png' alt='Logo'></p>                    </div>
                </body>
            </html>";

            message.Body = bodyBuilder.ToMessageBody();

            await SendEmailAsync(message);
        }

        private async Task SendEmailAsync(MimeMessage message)
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        private async Task<dynamic> GetTicketDetails(int ticketId)
        {
            return await (from t in _context.Tickets
                          join a in _context.Areas on t.IdArea equals a.Id
                          join usu in _context.Estados on t.IdEstado equals usu.Id
                          where t.Id == ticketId
                          select new
                          {
                              t.Id,
                              t.Nombre,
                              t.Descripcion,
                              t.Prioridad,
                              Area = a.Nombre,
                              FechaCreacion = t.FechaCreacion,
                              NameEstado = usu.Estado1,
                              t.IdUsuario,
                              t.IdUsuarioAsignado
                          }).FirstOrDefaultAsync();
        }

    }
}
