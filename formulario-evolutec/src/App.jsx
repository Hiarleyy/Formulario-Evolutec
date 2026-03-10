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
    endereco: '',
    jaFezCurso: '',
    cursoFeito: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'jaFezCurso' && value !== 'Sim' ? { cursoFeito: '' } : {})
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwomcMoWTsD3B2zRRs2HUnCiIeY5J0hsjzvnn38pCUKezM8UQ0TTMYY255e4NMsQHhFsA/exec'

    const iframe = document.createElement('iframe')
    iframe.name = 'hidden-iframe'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = GOOGLE_SCRIPT_URL
    form.target = 'hidden-iframe'

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()

    setTimeout(() => {
      document.body.removeChild(form)
      document.body.removeChild(iframe)
      setFormData({ nomeCompleto: '', telefone: '', endereco: '', jaFezCurso: '', cursoFeito: '' })
      setIsModalOpen(true)
      setIsSubmitting(false)
    }, 2000)
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
                type="text" 
                name="endereco"
                placeholder="Endereço"
                value={formData.endereco}
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
                <option value="">Você já fez algum curso?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
              <span className="required">*</span>
            </div>

            {formData.jaFezCurso === 'Sim' && (
              <div className="form-group">
                <input
                  type="text"
                  name="cursoFeito"
                  placeholder="Qual curso você já fez?"
                  value={formData.cursoFeito}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="required">*</span>
              </div>
            )}

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
