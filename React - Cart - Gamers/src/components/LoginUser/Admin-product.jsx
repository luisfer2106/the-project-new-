import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { fetchProductData } from "./ServiceAdmin/ServiceProduct";
import "./UserAdmin.css";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { Modal, Button } from "antd"; // <-- Importa Modal y Button de antd

const AdminProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    const idRol = parseInt(localStorage.getItem("id_rol"));
    if (idRol !== 1) {
      navigate("/login");
      return;
    }

    const getData = async () => {
      const productos = await fetchProductData();
      setData(productos); // 🚀 usamos todos los campos sin transformarlos
    };

    getData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("id_rol");
    navigate("/login");
  };

  // Mostrar el modal al hacer clic en agregar
  const handleAgregar = () => {
    setModalOpen(true);
  };

    const handleOk = async () => {
      setModalText("Registrando producto...");
      setConfirmLoading(true);

      const productData = {
        nombre,
        descripcion,
        cantidad: parseInt(cantidad),
        plataforma: parseInt(plataforma),
        imagen
      };

      try {
        await registerProduct(productData);
        setModalText("Producto registrado correctamente");
        setTimeout(() => {
          setModalOpen(false);
          setConfirmLoading(false);
          setModalText("Content of the modal");
          // Limpia los campos si quieres:
          setNombre("");
          setDescripcion("");
          setCantidad("");
          setPlataforma("");
          setImagen("");
        }, 2000);
      } catch (error) {
        setModalText("Error al registrar producto");
        setConfirmLoading(false);
      }
    };


  const handleCancel = () => {
    setModalOpen(false);
    setModalText("Content of the modal");
  };

  const handleEditar = (producto) => {
    alert(`Editar producto: ${producto.name_j}`);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Nombre", selector: row => row.name_j, sortable: true },
    { name: "Imagen", cell: row => <img src={row.image_j} alt={row.name_j} style={{ width: 50 }} /> },
    { name: "Descripción", selector: row => row.description_j },
    { name: "Fecha", selector: row => row.fecha },
    { name: "Hora", selector: row => row.hora },
    { name: "Cantidad", selector: row => row.cantidad },
    { name: "Status", selector: row => row.status },
    {
  name: "Plataforma",
  cell: row => {
    if (row.name_c === "PS5") {
      return (
        <img
          src="https://images.icon-icons.com/2429/PNG/512/playstation_logo_icon_147249.png"
          alt="PlayStation Logo"
          style={{ width: 30 }}
        />
      );
    } else if (row.name_c === "PS4") {
      return (
        <img
          src="https://www.svgrepo.com/show/452087/playstation.svg"
          alt="PS4 Logo"
          style={{ width: 30 }}
        />
      );
    } else if (row.name_c === "XBOX") {
      return (
        <img
          src="data:image/png;base64,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"
          alt="Xbox Logo"
          style={{ width: 30 }}
        />
      );
    } else if (row.name_c === "PC") {
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
          alt="Steam Logo"
          style={{ width: 30 }}
        />
      );
    } else {
      return row.name_c;
    }
  }
}
,
    {
      name: "Acciones",
      cell: row => (
        <div className="acciones">
          <button onClick={() => handleEditar(row)}>✏️</button>
          <button onClick={() => handleEliminar(row.id)}>🗑️</button>
        </div>
      )
    }
  ];

  const filteredData = data.filter(
    item => item.name_j.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full relative overflow-auto">
      {/* Tu contenido principal */}
      <div className="relative z-10">
        <div className="admin-wrapper">
          <div className="admin-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="admin-button" data-testid="btn-agregar" onClick={handleAgregar}>
              <FiPlus size={20} />
            </button>
            <button className="logout-button" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
              <FiLogOut size={20} /> {/* Ícono de cerrar sesión */}
            </button>
          </div>

          {/* Modal de Ant Design */}
         <Modal
          title="Agregar producto"
          open={modalOpen}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <form>
            <div style={{ marginBottom: 10 }}>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Plataforma:</label>
              <input
                type="text"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Descripción:</label>
              <input
                type="number"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Fecha:</label>
              <input
                type="number"
                value={plataforma}
                onChange={e => setPlataforma(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Hora:</label>
              <input
                type="text"
                value={imagen}
                onChange={e => setImagen(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </form>
        </Modal>

          <div className="tabla-productos shadow-table">
            <DataTable
              title="Productos"
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover1
              responsive
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="🔎 Buscar producto"
                  className="filtro-input"
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

};

export default AdminProduct;
