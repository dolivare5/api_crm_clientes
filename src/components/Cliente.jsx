import { useNavigate } from "react-router-dom";
const Cliente = ({ cliente, handleEliminar }) => {
    const navigate = useNavigate();
    const { nombre, empresa, telefono, email, observaciones, id } = cliente;
    return (
        <tr className="border-b hover: bg-gray-50">
            <td className="p-4">{nombre}</td>
            <td className="p-4">
                <p><span className="font-bold text-gray-800 uppercase">Email: </span>{email}</p>
                <p><span className="font-bold text-gray-800 uppercase">Teléfono: </span>{telefono}</p>
            </td>
            <td className="p-4">{empresa}</td>
            <td className="p-4">
                
                <button
                    className="block w-full p-2 mt-3 text-xs font-bold text-white uppercase bg-yellow-500 hover:bg-yellow-600"
                    type="button"
                    onClick={() => navigate(`/clientes/${id}`)}
                >Ver Más Info
                </button>

                <button
                    className="block w-full p-2 mt-3 text-xs font-bold text-white uppercase bg-blue-600 hover:bg-blue-700"
                    type="button"
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                >Editar
                </button>
                <button
                    className="block w-full p-2 mt-3 text-xs font-bold text-white uppercase bg-red-600 hover:bg-red-700"
                    type="button"
                    onClick={() => handleEliminar(id)}
                >Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Cliente