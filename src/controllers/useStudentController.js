import {useState} from 'react';
import {StudentModel} from '../Models/Studentmodels';

export const useStudentController = () => {
    const [students, setStudents] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleAddStudent = (nombre, matricula, materia, calificacion) => {
        const newStudent = new StudentModel(nombre, matricula, materia, calificacion);
        setStudents([...students, newStudent]);
        setFeedbackMessage('Estudiante agregado exitosamente');
    };

    const handleDeleteStudent = (matricula) => {
        const exists = students.find((student) => student.matricula === matricula);
        if (exists) {
            setStudents(students.filter(student => student.matricula !== matricula));
            setFeedbackMessage('Estudiante eliminado exitosamente');
        } else {
            setFeedbackMessage('No se encontró un estudiante con esa matrícula');
        }   
        setTimeout(() => setFeedbackMessage(''), 3000);
    }

    return { students, feedbackMessage, handleAddStudent, handleDeleteStudent };
};