import React, { useState } from 'react';
import { useStudentController } from '../controllers/useStudentController';

export const StudentAppView = () => {
  const { students, feedbackMessage, handleAddStudent, handleDeleteStudent } = useStudentController();
  const [currentMenu, setCurrentMenu] = useState('MAIN');
  const [formData, setFormData] = useState({ nombre: '', matricula: '', materia: '', calificacion: '' });
  const [searchMatricula, setSearchMatricula] = useState('');

  const onSubmitAdd = (e) => {
    e.preventDefault();
    handleAddStudent(formData.nombre, formData.matricula, formData.materia, formData.calificacion);
    setFormData({ nombre: '', matricula: '', materia: '', calificacion: '' });
    setCurrentMenu('MAIN');
  };

  const onSubmitOperate = (e) => {
    e.preventDefault();
    handleDeleteStudent(searchMatricula);
    setSearchMatricula('');
  };

  const btnStyle = { display: 'block', width: '100%', padding: '10px', margin: '5px 0', cursor: 'pointer', background: '#e0e0e0', border: 'none', borderRadius: '5px' };
  const inputStyle = { display: 'block', width: '95%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' };
  const tdStyle = { border: '1px solid #ccc', padding: '8px', textAlign: 'left' };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Gestión de Estudiantes (MVC)</h1>
      
      {feedbackMessage && (
        <div style={{ background: '#333', color: '#fff', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
          {feedbackMessage}
        </div>
      )}

      {currentMenu === 'MAIN' && (
        <div>
          <h2>Seleccionar Opción</h2>
          <button onClick={() => setCurrentMenu('ADD')} style={btnStyle}>1. Agregar Estudiante</button>
          <button onClick={() => setCurrentMenu('VIEW')} style={btnStyle}>2. Visualizar Registros</button>
          <button onClick={() => setCurrentMenu('OPERATE')} style={btnStyle}>3. Operar / Eliminar</button>
          <button onClick={() => alert('Fin del programa')} style={{...btnStyle, background: '#ffcccc'}}>4. Salir</button>
        </div>
      )}

      {currentMenu === 'ADD' && (
        <form onSubmit={onSubmitAdd}>
          <h2>Ingresar Datos</h2>
          <input type="text" placeholder="Nombre" required style={inputStyle} value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
          <input type="text" placeholder="Matrícula" required style={inputStyle} value={formData.matricula} onChange={e => setFormData({...formData, matricula: e.target.value})} />
          <input type="text" placeholder="Materia" required style={inputStyle} value={formData.materia} onChange={e => setFormData({...formData, materia: e.target.value})} />
          <input type="number" placeholder="Calificación" required style={inputStyle} value={formData.calificacion} onChange={e => setFormData({...formData, calificacion: e.target.value})} />
          <button type="submit" style={{...btnStyle, background: '#ccffcc'}}>Guardar registro</button>
          <button type="button" onClick={() => setCurrentMenu('MAIN')} style={btnStyle}>Volver al Menú</button>
        </form>
      )}

      {currentMenu === 'VIEW' && (
        <div>
          <h2>Lista de Registros</h2>
          {students.length === 0 ? (
            <p style={{ color: 'red' }}>No hay registros</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#eee' }}>
                  <th style={tdStyle}>Matrícula</th>
                  <th style={tdStyle}>Nombre</th>
                  <th style={tdStyle}>Materia</th>
                  <th style={tdStyle}>Calificación</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{st.matricula}</td>
                    <td style={tdStyle}>{st.nombre}</td>
                    <td style={tdStyle}>{st.materia}</td>
                    <td style={tdStyle}>{st.calificacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br/>
          <button onClick={() => setCurrentMenu('MAIN')} style={btnStyle}>Volver al Menú</button>
        </div>
      )}

      {currentMenu === 'OPERATE' && (
        <form onSubmit={onSubmitOperate}>
          <h2>Operar / Eliminar Registro</h2>
          <input type="text" placeholder="Ingresar Matrícula a buscar" required style={inputStyle} value={searchMatricula} onChange={e => setSearchMatricula(e.target.value)} />
          <button type="submit" style={{...btnStyle, background: '#ffcccc'}}>Buscar y Eliminar</button>
          <button type="button" onClick={() => setCurrentMenu('MAIN')} style={btnStyle}>Volver al Menú</button>
        </form>
      )}
    </div>
  );
};