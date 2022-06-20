import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape(
        {
            nombre:
                Yup.string()
                    .min(6, 'El nombre es muy corto')
                    .max(40, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio')
            ,
            empresa:
                Yup.string()
                    .required('Es obligatorio digitar el nombre de la empresa para la que trabaja el cliente')
            ,
            email:
                Yup.string()
                    .required('El correo es obligatorio')
                    .email('Email no valido')
            ,
            telefono:
                Yup.number()
                    .integer('N° de teléfono no válido')
                    .positive('N° de teléfono no válido')
                    .min(10, 'N° de teléfono muy corto')
                    .typeError('N° de teléfono no válido')
        }
    )

    const handleSubmit = async valores => {
        try {
            if (cliente.id) {
                // Editando un registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
                await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } else {
                // Nuevo Registro
                const url = import.meta.env.VITE_API_URL;
                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md md:w-3/4">
            <h1 className="text-xl font-bold text-center text-gray-600 uppercase">{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

            <Formik
                initialValues={
                    {
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        observaciones: cliente?.observaciones ?? ""
                    }
                }
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    resetForm();
                }}

                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    return (
                        cargando ? <Spinner /> : (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label
                                        className="text-gray-800"
                                        htmlFor='nombre'
                                    >Nombre:
                                    </label>
                                    <Field
                                        type="text"
                                        id="nombre"
                                        className="block w-full p-3 mt-2 bg-gray-50"
                                        placeholder="Ingresa aquí el nombre completo del cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className="text-gray-800"
                                        htmlFor='empresa'
                                    >Empresa:
                                    </label>
                                    <Field
                                        type="text"
                                        id="empresa"
                                        className="block w-full p-3 mt-2 bg-gray-50"
                                        placeholder="Ingresa aquí el nombre de la empresa"
                                        name="empresa"
                                    />

                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}

                                </div>

                                <div className='mb-4'>
                                    <label
                                        className="text-gray-800"
                                        htmlFor='email'
                                    >E-mail:
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        className="block w-full p-3 mt-2 bg-gray-50"
                                        placeholder="Ingresa aquí el correo electrónico del cliente"
                                        name="email"
                                    />

                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className="text-gray-800"
                                        htmlFor='telefono'
                                    >Teléfono:
                                    </label>
                                    <Field
                                        type="tel"
                                        id="telefono"
                                        className="block w-full p-3 mt-2 bg-gray-50"
                                        placeholder="Ingresa aquí el N° de teléfono del cliente"
                                        name="telefono"
                                    />

                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className="text-gray-800"
                                        htmlFor='observaciones'
                                    >Observaciones:
                                    </label>
                                    <Field
                                        as="textarea"
                                        type="text"
                                        id="observaciones"
                                        className="block w-full h-40 p-3 mt-2 bg-gray-50"
                                        placeholder="Ingresa aquí las observaciones (Opcional)"
                                        name="observaciones"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? "Actualizar Datos" : "Registrar Cliente"}
                                    className='w-full p-3 mt-5 text-lg font-bold text-white uppercase bg-blue-800 cursor-pointer'
                                />
                            </Form>
                        )
                    )
                }}
            </Formik>
        </div>
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario