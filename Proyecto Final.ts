//Marlon
import {Usuario} from './interfaces/usuario.interface'


let Usuarios: Usuario[] = []

//Marlon
function agregarUsuario(id_usuario: number, nombre: string, carnet: number, correo: string, clave: string, habilitado: boolean): void {
    const nuevoUsuario: Usuario = { id_usuario, nombre, carnet, correo, clave, habilitado: true }
    Usuarios.push(nuevoUsuario)
    console.log(`Usuario agregado: ${nombre}`)
}

function autenticarUsuario(correo: string, clave: string): Usuario | null {
    const usuario = Usuarios.find(u => u.correo === correo && u.clave === clave)
    if (usuario) {
        console.log(`Usuario autenticado: ${usuario.nombre}`)
        return usuario
    } else {
        console.log('Correo o clave incorrectos.')
        return null
    }
}

function deshabilitarUsuario(id_usuario: number): void {
    const usuarioIndex = Usuarios.findIndex(u => u.id_usuario === id_usuario)
    if (usuarioIndex !== -1) {
        Usuarios[usuarioIndex].habilitado = false
        console.log(`Usuario deshabilitado: ${Usuarios[usuarioIndex].nombre}`)
    } else {
        console.log(`No se encontró un usuario con ID ${id_usuario}`)
    }
}

function editarUsuario(id_usuario: number, nuevoUsuario: Partial<Usuario>): void {
    const usuarioN = Usuarios.findIndex(u => u.id_usuario === id_usuario)
    if (usuarioN !== -1) {
        Usuarios[usuarioN] = { ...Usuarios[usuarioN], ...nuevoUsuario }
        console.log(`Usuario editado: ${Usuarios[usuarioN].nombre}`)
    } else {
        console.log(`No se encontró un usuario con ID ${id_usuario}`)
    }
}

// Aca se cambian los valores para controlar los usuarios
agregarUsuario(1, "Juan Perez", 201912345, "juanperez@example.com", "Ju4N,P$R3z*", false)
agregarUsuario(2, "Pedro Lopez", 201922222, "pedrolopez@example.com", "p3DR,0LoPe7*", true)
autenticarUsuario("juanperez@example.com", "Ju4N,P$R3z*") 
//editarUsuario(1, { nombre: "Pedro Perez",carnet: 123456, correo: "@example.com", clave: "abc123" })
deshabilitarUsuario(0) // del 1 al 2

console.log("Datos del usuario:", Usuarios)


//Valery 


import {Paciente} from "./interfaces/paciente.interface";

let Paciente: Paciente[] = [];

function agregarPaciente(id_paciente: number, nombre: string, fecha_nacimiento: string, direccion: string, telefono: string): void {
    const nuevoPaciente: Paciente = { id_paciente, nombre, fecha_nacimiento, direccion, telefono}
    Paciente.push(nuevoPaciente)
    console.log(`Paciente agregado: ${nombre}`)
}

agregarPaciente(1, "Valery Gomez", "2001-12-03", "Ciudad de Guatemala", "45018741",)
agregarPaciente(2, "Jonathan Soberanis", "2000-10-20", "San Cristobal", "51849562",)

console.log("Datos del Paciente:",Paciente)

//Obtener Paciente por ID 

function obtenerPacientePorId(id_paciente: number): Paciente | undefined {
    return Paciente.find(paciente => paciente.id_paciente === id_paciente);
}

const paciente = obtenerPacientePorId(1);
if (paciente) {
    console.log(`Paciente encontrado: ${paciente.nombre}`);
} else {
    console.log('Paciente no encontrado');
}


// Contar pacientes 

function contarPacientes(): number {
    return Paciente.length;
}

const numeroDePacientes = contarPacientes();
console.log(`Número de pacientes registrados: ${numeroDePacientes}`);



//Jonathan
// Definición de la interfaz Cita
interface Cita {
    id_cita: number;
    id_paciente: number;
    id_doctor: number;
    fecha_hora: Date;
  }
  
  // Clase de Gestión de Citas
  class GestorDeCitas {
    private citas: Cita[] = []; // Inicializar citas como un array vacío
  
    // Programar cita
    public programarCita(id_paciente: number, id_doctor: number, fecha_hora: Date): Cita {
      const id_cita = this.citas.length > 0 ? this.citas[this.citas.length - 1].id_cita + 1 : 1; // Generar un nuevo ID de cita
      const nuevaCita: Cita = {
        id_cita,
        id_paciente,
        id_doctor,
        fecha_hora
      };
      this.citas.push(nuevaCita); // Agregar cita al array de citas
      return nuevaCita;
    }
  
    // Cancelar cita
    public cancelarCita(id_cita: number): void {
      const index = this.citas.findIndex(cita => cita.id_cita === id_cita); // Buscar cita por ID de cita
      if (index !== -1) {
        this.citas.splice(index, 1); // Eliminar cita del array
      }
    }
  
    // Reprogramar cita
    public reprogramarCita(id_cita: number, nuevaFechaHora: Date): void {
      const cita = this.citas.find(cita => cita.id_cita === id_cita); // Buscar cita por ID de cita
      if (cita) {
        cita.fecha_hora = nuevaFechaHora; // Actualizar fecha y hora de la cita
      }
    }
  
    // Obtener citas de un doctor
    public obtenerCitasDeDoctor(id_doctor: number): Cita[] {
      return this.citas.filter(cita => cita.id_doctor === id_doctor); // Filtrar citas por ID de doctor
    }
  
    // Obtener citas de un paciente
    public obtenerCitasDePaciente(id_paciente: number): Cita[] {
      return this.citas.filter(cita => cita.id_paciente === id_paciente); // Filtrar citas por ID de paciente
    }
  
    // Obtener citas por fecha
    public obtenerCitasPorFecha(fecha: Date): Cita[] {
      return this.citas.filter(cita => cita.fecha_hora.toDateString() === fecha.toDateString()); // Filtrar citas por fecha
    }
  }
  
//Luis Borrayo
// Definiciones de interfaces
type ID = number;

interface Horario {
    dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
    hora_inicio: string;
    hora_fin: string;
}

interface Doctor {
    id_doctor: ID;
    nombre: string;
    especialidad: 'Odontología' | 'Cirujano Oral';
    horario: Horario[];
}

class Clinic {
    private doctors: Doctor[] = [];

    agregarDoctor(doctor: Doctor): void {
        this.doctors.push(doctor);
    }

    editarDoctor(id_doctor: ID, updatedDoctor: Partial<Doctor>): void {
        const doctor = this.buscarDoctorPorId(id_doctor);
        if (doctor) {
            Object.assign(doctor, updatedDoctor);
        } else {
            console.log(`Doctor con ID ${id_doctor} no encontrado.`);
        }
    }

    eliminarDoctor(id_doctor: ID): void {
        this.doctors = this.doctors.filter(doc => doc.id_doctor !== id_doctor);
    }

    buscarDoctorPorId(id_doctor: ID): Doctor | undefined {
        return this.doctors.find(doc => doc.id_doctor === id_doctor);
    }

    obtenerDoctoresDisponiblesPorDia(dia: string): Doctor[] {
        return this.doctors.filter(doctor =>
            doctor.horario.some((schedule: Horario) => schedule.dia === dia)
        );
    }

    obtenerTodosLosDoctores(): Doctor[] {
        return this.doctors;
    }

    contarDoctores(): number {
        return this.doctors.length;
    }

    validarDisponibilidadDoctor(id_doctor: ID, dia: string, hora: string): boolean {
        const doctor = this.buscarDoctorPorId(id_doctor);
        if (doctor) {
            return doctor.horario.some((schedule: Horario) =>
                schedule.dia === dia &&
                schedule.hora_inicio <= hora &&
                schedule.hora_fin >= hora
            );
        } else {
            console.log(`Doctor con ID ${id_doctor} no encontrado.`);
            return false;
        }
    }
}

const clinic = new Clinic();

const doctor1: Doctor = {
    id_doctor: 1,
    nombre: 'María García',
    especialidad: 'Odontología',
    horario: [
        { dia: 'Lunes', hora_inicio: '08:00', hora_fin: '12:00' },
        { dia: 'Miércoles', hora_inicio: '14:00', hora_fin: '18:00' },
        { dia: 'Viernes', hora_inicio: '10:00', hora_fin: '14:00' }
    ]
};

const doctor2: Doctor = {
    id_doctor: 2,
    nombre: 'Dr. Carla Pérez',
    especialidad: 'Odontología',
    horario: [
        { dia: 'Lunes', hora_inicio: '08:00', hora_fin: '17:00' },
        { dia: 'Miércoles', hora_inicio: '08:00', hora_fin: '12:00' }
    ]
};

const doctor3: Doctor = {
    id_doctor: 3,
    nombre: 'Dra. Ana Gómez',
    especialidad: 'Odontología',
    horario: [
        { dia: 'Miércoles', hora_inicio: '12:00', hora_fin: '17:00' },
        { dia: 'Viernes', hora_inicio: '08:00', hora_fin: '17:00' }
    ]
};

const doctor4: Doctor = {
    id_doctor: 4,
    nombre: 'Dr. Mario Sanchez',
    especialidad: 'Cirujano Oral',
    horario: [
        { dia: 'Lunes', hora_inicio: '08:00', hora_fin: '17:00' },
        { dia: 'Jueves', hora_inicio: '08:00', hora_fin: '17:00' }
    ]
};

clinic.agregarDoctor(doctor1);
clinic.agregarDoctor(doctor2);
clinic.agregarDoctor(doctor3);
clinic.agregarDoctor(doctor4);

console.log(clinic.obtenerTodosLosDoctores()); 
console.log(clinic.contarDoctores()); 

console.log(clinic.validarDisponibilidadDoctor(1, 'Lunes', '09:00')); 
console.log(clinic.validarDisponibilidadDoctor(1, 'Martes', '09:00'));

clinic.editarDoctor(1, { nombre: 'María García Editada' });
console.log(clinic.buscarDoctorPorId(1));

clinic.eliminarDoctor(2);
console.log(clinic.contarDoctores()); 

console.log(clinic.obtenerDoctoresDisponiblesPorDia('Lunes'));

//Santi
// Importación de interfaces
import { Receta } from './interfaces/receta.interface';
import { ProductoServicio } from './interfaces/producto_servicio.interface';
import { Factura } from './interfaces/factura.interface';
import { Medicamento } from './interfaces/medicamento.interface';

// Variables globales
let recetas: Receta[] = [];
let productosServicios: ProductoServicio[] = [];
let facturas: Factura[] = [];

// Registro de recetas
function crearReceta(receta: Receta): void {
    const id_receta = recetas.length + 1;
    receta.id_receta = id_receta;
    recetas.push(receta);
    console.log(`Receta creada para el paciente ${receta.id_paciente}`);
}

function editarReceta(id_receta: number, nuevaReceta: Receta): void {
    const index = recetas.findIndex(r => r.id_receta === id_receta);
    if (index !== -1) {
        recetas[index] = nuevaReceta;
        console.log(`Receta editada para el paciente ${nuevaReceta.id_paciente}`);
    } else {
        console.log(`Receta con ID ${id_receta} no encontrada`);
    }
}


function obtenerRecetasDePaciente(id_paciente: number): Receta[] {
    return recetas.filter(r => r.id_paciente === id_paciente);
}

function obtenerMedicamentosDeReceta(id_receta: number): Medicamento[] {
    const receta = recetas.find(r => r.id_receta === id_receta);
    return receta ? receta.medicamentos : [];
}

// Administración de productos y servicios
function crearProductoServicio(nombre: string, tipo: "Servicio" | "Producto", precio: number): void {
    const id_producto_servicio = productosServicios.length + 1;
    const nuevoProductoServicio: ProductoServicio = { id_producto_servicio, nombre, tipo, precio };
    productosServicios.push(nuevoProductoServicio);
    console.log(`Producto/Servicio creado: ${nombre}`);
}

function editarProductoServicio(id_producto_servicio: number, nombre: string, tipo: "Servicio" | "Producto", precio: number): void {
    const index = productosServicios.findIndex(ps => ps.id_producto_servicio === id_producto_servicio);
    if (index !== -1) {
        productosServicios[index] = { ...productosServicios[index], nombre, tipo, precio };
        console.log(`Producto/Servicio editado: ${nombre}`);
    } else {
        console.log(`Producto/Servicio con ID ${id_producto_servicio} no encontrado`);
    }
}


function obtenerProductoServicioPorId(id_producto_servicio: number): ProductoServicio | undefined {
    return productosServicios.find(ps => ps.id_producto_servicio === id_producto_servicio);
}

function obtenerProductosServiciosPorTipo(tipo: string): ProductoServicio[] {
    return productosServicios.filter(ps => ps.tipo === tipo);
}

// Facturación de servicios prestados
function crearFactura(id_paciente: number, servicios_consumidos: ProductoServicio[], total: number): void {
    const id_factura = facturas.length + 1;
    const serviciosIds = servicios_consumidos.map(sc => sc.id_producto_servicio);
    const nuevaFactura: Factura = {
        id_factura, id_paciente, servicios_consumidos: serviciosIds, total, fecha_hora: new Date(), id_doctor: 0,
        fecha: undefined
    };
    facturas.push(nuevaFactura);
    console.log(`Factura creada para el paciente ${id_paciente}`);
}

function editarFactura(id_factura: number, nuevosServiciosConsumidos: ProductoServicio[], nuevoTotal: number): void {
    const index = facturas.findIndex(f => f.id_factura === id_factura);
    if (index !== -1) {
        const serviciosIds = nuevosServiciosConsumidos.map(sc => sc.id_producto_servicio);
        facturas[index].servicios_consumidos = serviciosIds;
        facturas[index].total = nuevoTotal;
        console.log(`Factura editada para el paciente ${facturas[index].id_paciente}`);
    } else {
        console.log(`Factura con ID ${id_factura} no encontrada`);
    }
}


function obtenerFacturasPorCliente(id_paciente: number): Factura[] {
    return facturas.filter(f => f.id_paciente === id_paciente);
}

function obtenerProductosPorFactura(id_factura: number): { nombre: string, precio: number }[] {
    const factura = facturas.find(f => f.id_factura === id_factura);
    return factura ? factura.servicios_consumidos.map((value: number, index: number, array: number[]) => {
        const sc = productosServicios.find(ps => ps.id_producto_servicio === value);
        return { nombre: sc?.nombre ?? '', precio: sc?.precio ?? 0 };
    }) : [];
}

function obtenerFacturasPorFecha(fecha: Date): Factura[] {
    return facturas.filter(f => f.fecha.toDateString() === fecha.toDateString());
}

function obtenerTotalFacturacionPorMes(mes: number, anio: number): number {
    return facturas.filter(f => f.fecha.getMonth() === mes && f.fecha.getFullYear() === anio).reduce((total, factura) => total + factura.total, 0);
}

// Funciones de prueba
function prueba() {
    // Prueba de registro de recetas
    crearReceta({ id_receta: 0, id_paciente: 1, id_doctor: 0, medicamentos: [{ nombre: 'Paracetamol', dosis: '500mg', frecuencia_horas: '8 horas', duracion_dias: '3 días' }] });
    editarReceta(1, {
        id_receta: 1, id_paciente: 1, medicamentos: [{
            nombre: 'Ibuprofeno', dosis: '400mg',
            frecuencia_horas: '',
            duracion_dias: ''
        }],
        id_doctor: 0
    });
    console.log(obtenerRecetasDePaciente(1));
    console.log(obtenerMedicamentosDeReceta(1));

    // Prueba de administración de productos y servicios
    crearProductoServicio('Limpieza dental', 'Servicio', 50);
    editarProductoServicio(1, 'Limpieza dental', 'Servicio', 60);
    console.log(obtenerProductoServicioPorId(1));
    console.log(obtenerProductosServiciosPorTipo('Servicio'));

    // Prueba de facturación de servicios prestados
    crearFactura(1, [{ id_producto_servicio: 1, nombre: 'Limpieza dental', tipo: 'Servicio', precio: 60 }], 60);
    editarFactura(1, [{ id_producto_servicio: 1, nombre: 'Limpieza dental', tipo: 'Servicio', precio: 60 }], 70);
    console.log(obtenerFacturasPorCliente(1));
    console.log(obtenerProductosPorFactura(1));
    console.log(obtenerFacturasPorFecha(new Date(2024, 5, 10)));
    console.log(obtenerTotalFacturacionPorMes(5, 2024));
}

// Prueba
prueba();

// Guardar datos al finalizar la ejecución

function guardarDatos(usuarios: any[], pacientes: any[], citas: any[], doctores: any[], recetas: Receta[], productosServicios: ProductoServicio[], facturas: Factura[]) {
    // Implementación de guardado de datos (simulación)
    console.log('Datos guardados');
}

process.on('exit', () => guardarDatos([], [], [], [], recetas, productosServicios, facturas));
