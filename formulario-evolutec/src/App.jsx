import { useState } from 'react'
import './App.css'
import cursos from './cursos.json'
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
    curso: '',
    cidade: '',
    jaFezCurso: ''
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
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyQV2ewgNUHWiBR6WYgwuhTyJ9C2o1wOJF8OWotJ1k6Jwl5V3bvjR-1QuAyznMkWlH_CQ/exec'

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(formData)
      })

      setFormData({ nomeCompleto: '', telefone: '', curso: '', cidade: '', jaFezCurso: '' })
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


            <div className="form-group">
              <select
                name="jaFezCurso"
                value={formData.jaFezCurso}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Já fez algum curso de tecnologia?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
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
