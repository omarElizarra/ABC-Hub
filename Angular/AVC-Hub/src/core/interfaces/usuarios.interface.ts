export {
    IUsuario,
    ICredenciales,
    IResUsuario
}

interface IUsuario {
    ID_Usuario?: number;
    Nombre: string;
    Correo: string;
    Contraseña: string;
    Fecha_Creacion?: Date;
}

interface ICredenciales {
    usuario: string,
    psw: string
}

interface IResUsuario {
    apellidoMaterno:string,
    apellidoPaterno:string,
    correo:string,
    idRol:number,
    idUsuario: number,
    nombre: string,
    nombreUsuario:  string,
    psw:    string
}