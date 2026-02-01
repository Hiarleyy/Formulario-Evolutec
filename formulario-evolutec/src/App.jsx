import { useState } from 'react'
import './App.css'
import cursos from './cursos.json'
import { SpeedInsights } from "@vercel/speed-insights/react"

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3 className="modal-title">Envio realizado</h3>
        <p className="modal-text">Suas informações foram salvas com sucesso.</p>
        <button type="button" className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Fechar modal"
        onClick={onClose}
      />
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    email: '',
    curso: '',
    cidade: '',
    horario: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNRZ164sdJgbwidZvjPI2OGcTemxWhwnQVFFngo2aEuoRra0ZJZfk8LeqTONDCM_PgXQ/exec'
      const body = new URLSearchParams(formData)

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body
      })

      setFormData({ nomeCompleto: '', telefone: '', email: '', curso: '', cidade: '', horario: '' })
      setIsModalOpen(true)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='Background'>
      <div className="container">
        <div className="formulario-container">
          <img src="/Evolutec.png" alt="" className='logo'/>
          <h2 className="formulario-title">Entraremos em contato com você!</h2>
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="nomeCompleto"
                placeholder="Nome completo"
                value={formData.nomeCompleto}
                onChange={handleChange}
                required
                className="form-input"
              />
              <span className="required">*</span>
            </div>

            <div className="form-group">
              <input 
                type="tel" 
                name="telefone"
                placeholder="+55 Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="form-input"
              />
              <span className="required">*</span>
            </div>

            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <select 
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                required
                className="form-input"
              >
                {cursos.map((curso, idx) => (
                  <option key={idx} value={curso.value}>
                    {curso.label}
                  </option>
                ))}
              </select>
              <span className="required">*</span>
            </div>

            <div className="form-group">
              <input 
                type="text" 
                name="cidade"
                placeholder="Qual cidade você mora?"
                value={formData.cidade}
                onChange={handleChange}
                required
                className="form-input"
              />
              <span className="required">*</span>
            </div>


            <button type="submit" className="btn-enviar" disabled={isSubmitting}>
              {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
            </button>
          </form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default App
