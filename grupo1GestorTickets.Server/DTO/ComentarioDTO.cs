﻿namespace grupo1GestorTickets.Server.DTO
{


    
        public class ComentarioDTO
        {

            public string Comentario { get; set; } = null!;

            public int IdTicket { get; set; }
            public int IdUsuario { get; set; }

            public DateTime fechaCreacion { get; set; }
    }
    
}


