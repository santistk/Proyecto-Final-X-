
import * as fs from 'fs';
import * as path from 'path';

// Definir tipos de datos
type ID = number;

// Interfaces
interface Usuario {
    id_usuario: ID;
    nombre: string;
    carnet: number;
    correo: string;
    clave: string;
    habilitado: boolean;
}

interface Paciente {
    id_paciente: ID;
    nombre: string;
    fecha_nacimiento: Date;
    direccion: string;
    telefono: number;
    alergias: string[];
    medicamentos_actuales: string[];
    condiciones_medicas: string[];
}

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

interface Cita {
    fecha_hora: Date;
    id_paciente: ID;
    id_doctor: ID;
}

interface Medicamento {
    nombre: string;
    dosis: string;
    frecuencia_horas: number;
    duracion_dias: number;
}

interface Receta {
    id_paciente: ID;
    id_doctor: ID;
    medicamentos: Medicamento[];
}

interface ProductoServicio {
    id_producto_servicio: ID;
    tipo: 'Servicio' | 'Producto';
    nombre: string;
    precio: number;
}

interface Factura {
    id_factura: ID;
    fecha_hora: Date;
    id_paciente: ID;
    id_doctor: ID;
    servicios_consumidos: ID[];
    total: number;
}

// Funciones auxiliares para manejar datos
function cargarDatos<T>(nombreArchivo: string): T[] {
    const ruta = path.join(__dirname, 'data', `${nombreArchivo}.json`);
    if (fs.existsSync(ruta)) {
        const datos = fs.readFileSync(ruta, 'utf-8');
        return JSON.parse(datos) as T[];
    }
    return [];
}

function guardarDatos<T>(nombreArchivo: string, datos: T[]): void {
    const directorio = path.join(__dirname, 'data');
    const ruta = path.join(directorio, `${nombreArchivo}.json`);

    // Verificar si el directorio 'data' existe, si no, crearlo
    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
    }

    // Guardar los datos en el archivo JSON
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

// Gestión de Usuarios
function crearUsuario(usuario: Usuario): void {
    const usuarios = cargarDatos<Usuario>('usuarios');
    usuarios.push(usuario);
    guardarDatos('usuarios', usuarios);
}

function editarUsuario(id: ID, usuarioActualizado: Partial<Usuario>): void {
    const usuarios = cargarDatos<Usuario>('usuarios');
    const indice = usuarios.findIndex(u => u.id_usuario === id);
    if (indice !== -1) {
        usuarios[indice] = { ...usuarios[indice], ...usuarioActualizado };
        guardarDatos('usuarios', usuarios);
    }
}

function deshabilitarUsuario(id: ID): void {
    const usuarios = cargarDatos<Usuario>('usuarios');
    const indice = usuarios.findIndex(u => u.id_usuario === id);
    if (indice !== -1) {
        usuarios[indice].habilitado = false;
        guardarDatos('usuarios', usuarios);
    }
}

function autenticarUsuario(correo: string, clave: string): Usuario | undefined {
    const usuarios = cargarDatos<Usuario>('usuarios');
    return usuarios.find(u => u.correo === correo && u.clave === clave && u.habilitado);
}

function desautenticarUsuario(): void {
    // Implementación específica de desautenticación
}

// Gestión de Pacientes
function crearPaciente(paciente: Paciente): void {
    const pacientes = cargarDatos<Paciente>('pacientes');
    pacientes.push(paciente);
    guardarDatos('pacientes', pacientes);
}

function editarPaciente(id: ID, pacienteActualizado: Partial<Paciente>): void {
    const pacientes = cargarDatos<Paciente>('pacientes');
    const indice = pacientes.findIndex(p => p.id_paciente === id);
    if (indice !== -1) {
        pacientes[indice] = { ...pacientes[indice], ...pacienteActualizado };
        guardarDatos('pacientes', pacientes);
    }
}

function eliminarPaciente(id: ID): void {
    const pacientes = cargarDatos<Paciente>('pacientes');
    const indice = pacientes.findIndex(p => p.id_paciente === id);
    if (indice !== -1) {
        pacientes.splice(indice, 1);
        guardarDatos('pacientes', pacientes);
    }
}

function obtenerPacientePorId(id: ID): Paciente | undefined {
    const pacientes = cargarDatos<Paciente>('pacientes');
    return pacientes.find(p => p.id_paciente === id);
}

function obtenerEdadPaciente(id: ID): number | undefined {
    const paciente = obtenerPacientePorId(id);
    if (paciente) {
        const diff = Date.now() - new Date(paciente.fecha_nacimiento).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
    return undefined;
}

function obtenerTodosLosPacientes(): Paciente[] {
    return cargarDatos<Paciente>('pacientes');
}

function contarPacientes(): number {
    return cargarDatos<Paciente>('pacientes').length;
}

function obtenerUltimasRecetasDelPaciente(id: ID): Receta[] {
    const recetas = cargarDatos<Receta>('recetas');
    return recetas.filter(r => r.id_paciente === id).slice(-5);
}

// Gestión de Citas
function programarCita(cita: Cita): void {
    const citas = cargarDatos<Cita>('citas');
    citas.push(cita);
    guardarDatos('citas', citas);
}

function cancelarCita(fecha_hora: Date, id_paciente: ID, id_doctor: ID): void {
    const citas = cargarDatos<Cita>('citas');
    const indice = citas.findIndex(c => c.fecha_hora === fecha_hora && c.id_paciente === id_paciente && c.id_doctor === id_doctor);
    if (indice !== -1) {
        citas.splice(indice, 1);
        guardarDatos('citas', citas);
    }
}

function reprogramarCita(fecha_hora: Date, id_paciente: ID, id_doctor: ID, nuevaCita: Partial<Cita>): void {
    const citas = cargarDatos<Cita>('citas');
    const indice = citas.findIndex(c => c.fecha_hora === fecha_hora && c.id_paciente === id_paciente && c.id_doctor === id_doctor);
    if (indice !== -1) {
        citas[indice] = { ...citas[indice], ...nuevaCita };
        guardarDatos('citas', citas);
    }
}

function obtenerCitasPorDoctor(id_doctor: ID): Cita[] {
    const citas = cargarDatos<Cita>('citas');
    return citas.filter(c => c.id_doctor === id_doctor);
}

function obtenerCitasPorPaciente(id_paciente: ID): Cita[] {
    const citas = cargarDatos<Cita>('citas');
    return citas.filter(c => c.id_paciente === id_paciente);
}

function obtenerCitasPorFecha(fecha: Date): Cita[] {
    const citas = cargarDatos<Cita>('citas');
    return citas.filter(c => new Date(c.fecha_hora).toDateString() === fecha.toDateString());
}

// Gestión de Doctores y Horarios
function crearDoctor(doctor: Doctor): void {
    const doctores = cargarDatos<Doctor>('doctores');
    doctores.push(doctor);
    guardarDatos('doctores', doctores);
}

function editarDoctor(id: ID, doctorActualizado: Partial<Doctor>): void {
    const doctores = cargarDatos<Doctor>('doctores');
    const indice = doctores.findIndex(d => d.id_doctor === id);
    if (indice !== -1) {
        doctores[indice] = { ...doctores[indice], ...doctorActualizado };
        guardarDatos('doctores', doctores);
    }
}

function eliminarDoctor(id: ID): void {
    const doctores = cargarDatos<Doctor>('doctores');
    const indice = doctores.findIndex(d => d.id_doctor === id);
    if (indice !== -1) {
        doctores.splice(indice, 1);
        guardarDatos('doctores', doctores);
    }
}

function obtenerDoctorPorId(id: ID): Doctor | undefined {
    const doctores = cargarDatos<Doctor>('doctores');
    return doctores.find(d => d.id_doctor === id);
}

function obtenerDoctoresDisponiblesPorFecha(fecha: Date): Doctor[] {
    const doctores = cargarDatos<Doctor>('doctores');
    return doctores.filter(d => d.horario.some(h => new Date(fecha).toDateString() === h.dia));
}

function obtenerTodosLosDoctores(): Doctor[] {
    return cargarDatos<Doctor>('doctores');
}

function contarDoctores(): number {
    return cargarDatos<Doctor>('doctores').length;
}

function validarDisponibilidadDoctor(id: ID, fecha: Date): boolean {
    const doctor = obtenerDoctorPorId(id);
    if (doctor) {
        return doctor.horario.some(h => new Date(fecha).toDateString() === h.dia);
    }
    return false;
}

// Gestión de Recetas
function crearReceta(receta: Receta): void {
    const recetas = cargarDatos<Receta>('recetas');
    recetas.push(receta);
    guardarDatos('recetas', recetas);
}

function editarReceta(id_paciente: ID, id_doctor: ID, recetaActualizada: Partial<Receta>): void {
    const recetas = cargarDatos<Receta>('recetas');
    const indice = recetas.findIndex(r => r.id_paciente === id_paciente && r.id_doctor === id_doctor);
    if (indice !== -1) {
        recetas[indice] = { ...recetas[indice], ...recetaActualizada };
        guardarDatos('recetas', recetas);
    }
}

function eliminarReceta(id_paciente: ID, id_doctor: ID): void {
    const recetas = cargarDatos<Receta>('recetas');
    const indice = recetas.findIndex(r => r.id_paciente === id_paciente && r.id_doctor === id_doctor);
    if (indice !== -1) {
        recetas.splice(indice, 1);
        guardarDatos('recetas', recetas);
    }
}

function obtenerRecetasPorPaciente(id_paciente: ID): Receta[] {
    const recetas = cargarDatos<Receta>('recetas');
    return recetas.filter(r => r.id_paciente === id_paciente);
}

function obtenerMedicamentosPorReceta(id_paciente: ID, id_doctor: ID): Medicamento[] | undefined {
    const recetas = cargarDatos<Receta>('recetas');
    const receta = recetas.find(r => r.id_paciente === id_paciente && r.id_doctor === id_doctor);
    return receta ? receta.medicamentos : undefined;
}

// Gestión de Productos y Servicios
function crearProductoServicio(productoServicio: ProductoServicio): void {
    const productosServicios = cargarDatos<ProductoServicio>('productos_servicios');
    productosServicios.push(productoServicio);
    guardarDatos('productos_servicios', productosServicios);
}

function editarProductoServicio(id: ID, productoServicioActualizado: Partial<ProductoServicio>): void {
    const productosServicios = cargarDatos<ProductoServicio>('productos_servicios');
    const indice = productosServicios.findIndex(ps => ps.id_producto_servicio === id);
    if (indice !== -1) {
        productosServicios[indice] = { ...productosServicios[indice], ...productoServicioActualizado };
        guardarDatos('productos_servicios', productosServicios);
    }
}

function eliminarProductoServicio(id: ID): void {
    const productosServicios = cargarDatos<ProductoServicio>('productos_servicios');
    const indice = productosServicios.findIndex(ps => ps.id_producto_servicio === id);
    if (indice !== -1) {
        productosServicios.splice(indice, 1);
        guardarDatos('productos_servicios', productosServicios);
    }
}

function obtenerProductoServicioPorId(id: ID): ProductoServicio | undefined {
    const productosServicios = cargarDatos<ProductoServicio>('productos_servicios');
    return productosServicios.find(ps => ps.id_producto_servicio === id);
}

function obtenerProductosServiciosPorTipo(tipo: 'Servicio' | 'Producto'): ProductoServicio[] {
    const productosServicios = cargarDatos<ProductoServicio>('productos_servicios');
    return productosServicios.filter(ps => ps.tipo === tipo);
}

// Gestión de Facturas
function crearFactura(factura: Factura): void {
    const facturas = cargarDatos<Factura>('facturas');
    facturas.push(factura);
    guardarDatos('facturas', facturas);
}

function editarFactura(id: ID, facturaActualizada: Partial<Factura>): void {
    const facturas = cargarDatos<Factura>('facturas');
    const indice = facturas.findIndex(f => f.id_factura === id);
    if (indice !== -1) {
        facturas[indice] = { ...facturas[indice], ...facturaActualizada };
        guardarDatos('facturas', facturas);
    }
}

function eliminarFactura(id: ID): void {
    const facturas = cargarDatos<Factura>('facturas');
    const indice = facturas.findIndex(f => f.id_factura === id);
    if (indice !== -1) {
        facturas.splice(indice, 1);
        guardarDatos('facturas', facturas);
    }
}

function obtenerFacturasPorCliente(id_paciente: ID): Factura[] {
    const facturas = cargarDatos<Factura>('facturas');
    return facturas.filter(f => f.id_paciente === id_paciente);
}

function obtenerProductosPorFactura(id_factura: ID): (ProductoServicio | undefined)[] {
    const facturas = cargarDatos<Factura>('facturas');
    const productosServicios = cargarDatos<ProductoServicio>('productos_servicios');
    const factura = facturas.find(f => f.id_factura === id_factura);
    return factura ? factura.servicios_consumidos.map(id => productosServicios.find(ps => ps.id_producto_servicio === id)) : [];
}

function obtenerFacturasPorFecha(fecha: Date): Factura[] {
    const facturas = cargarDatos<Factura>('facturas');
    return facturas.filter(f => new Date(f.fecha_hora).toDateString() === fecha.toDateString());
}

function obtenerTotalFacturacionPorMes(mes: number, anio: number): number {
    const facturas = cargarDatos<Factura>('facturas');
    return facturas.filter(f => new Date(f.fecha_hora).getMonth() === mes && new Date(f.fecha_hora).getFullYear() === anio).reduce((total, factura) => total + factura.total, 0);
}

// Ejemplo de uso
crearUsuario({
    id_usuario: 1,
    nombre: 'Admin',
    carnet: 12345,
    correo: 'admin@clinic.com',
    clave: 'admin123',
    habilitado: true
});

const usuario = autenticarUsuario('admin@clinic.com', 'admin123');
if (usuario) {
    console.log('Usuario autenticado:', usuario);
} else {
    console.log('Fallo en la autenticación');
}
