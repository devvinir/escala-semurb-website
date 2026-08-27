import "../styles/PrivacyPolicy.css";
import {useNavigate} from "react-router-dom"

function PrivacyPolicy() {

    const route = useNavigate()

  return (
    <div className="privacy-container">

      <header className="privacy-header">
        <h1>Política de Privacidade</h1>
        <p className="privacy-text">Escala SEMURB</p>
        <span>Última atualização: Agosto de 2026</span>
      </header>


      <section className="privacy-card">
        <h2 className="privacy-text">1. Introdução</h2>

        <p className="privacy-text">
          O <strong>Escala SEMURB</strong> é um sistema web desenvolvido como
          projeto acadêmico destinado à demonstração da digitalização dos
          processos internos da Secretaria de Mobilidade Urbana (SEMURB).
        </p>

        <p className="privacy-text">
          Esta Política de Privacidade explica como as informações dos usuários
          são coletadas, utilizadas, armazenadas e protegidas durante a
          utilização do sistema, seguindo os princípios estabelecidos pela
          Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
        </p>
      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">2. Responsável pelo tratamento dos dados</h2>

        <p className="privacy-text">
          O controlador dos dados tratados pelo sistema é:
        </p>

        <div className="highlight-box">
          Sistema desenvolvido como projeto acadêmico destinado à demonstração
          da digitalização dos processos internos da SEMURB.
        </div>

        <p className="privacy-text">
          O sistema possui finalidade exclusivamente demonstrativa e acadêmica,
          apresentando uma solução tecnológica para otimização do gerenciamento
          de escalas, funcionários, equipes e setores.
        </p>
      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">3. Sobre o sistema</h2>

        <p className="privacy-text">
          O Escala SEMURB permite o gerenciamento e consulta de informações
          relacionadas às escalas de trabalho.
        </p>

        <ul className="privacy-text">
          <li>Consulta de escalas individuais;</li>
          <li>Visualização de dias de trabalho, folgas e feriados;</li>
          <li>Gerenciamento de funcionários;</li>
          <li>Gerenciamento de setores e equipes;</li>
          <li>Controle de turnos;</li>
          <li>Registro de alterações de escala;</li>
          <li>Geração de relatórios administrativos;</li>
          <li>Confirmação de leitura das escalas.</li>
        </ul>
      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">4. Dados pessoais coletados</h2>

        <h3 className="privacy-text">Dados cadastrais</h3>

        <ul className="privacy-text">
          <li>Nome completo;</li>
          <li>Matrícula funcional;</li>
          <li>E-mail;</li>
          <li>Telefone;</li>
          <li>Cargo ou função;</li>
          <li>Setor de atuação;</li>
          <li>Equipe vinculada;</li>
          <li>Foto de perfil quando disponibilizada.</li>
        </ul>


        <h3 className="privacy-text">Dados relacionados à atividade profissional</h3>

        <ul className="privacy-text">
          <li>Escala de trabalho;</li>
          <li>Turno;</li>
          <li>Horários de trabalho;</li>
          <li>Intervalos;</li>
          <li>Dias de folga;</li>
          <li>Alterações específicas de escala;</li>
          <li>Confirmação de leitura.</li>
        </ul>

      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">5. Dados técnicos de utilização</h2>

        <ul className="privacy-text">
          <li>Tokens de autenticação;</li>
          <li>Informações necessárias para manutenção da sessão;</li>
          <li>Dados armazenados localmente pelo navegador;</li>
          <li>Comunicação entre aplicação e API.</li>
        </ul>

      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">6. Finalidade do tratamento dos dados</h2>

        <ul className="privacy-text">
          <li>Permitir acesso autenticado ao sistema;</li>
          <li>Identificar usuários;</li>
          <li>Exibir escalas individuais;</li>
          <li>Organizar funcionários, setores e equipes;</li>
          <li>Gerenciar turnos e jornadas;</li>
          <li>Gerar relatórios administrativos;</li>
          <li>Digitalizar processos internos.</li>
        </ul>

      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">7. Compartilhamento das informações</h2>

        <p className="privacy-text">
          Os dados pessoais tratados pelo Escala SEMURB não são vendidos,
          comercializados ou compartilhados para fins comerciais.
        </p>

        <p className="privacy-text">
          O acesso ocorre somente por usuários autorizados conforme seus
          respectivos níveis de permissão.
        </p>

      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">8. Segurança dos dados</h2>

        <ul className="privacy-text">
          <li>Controle de autenticação;</li>
          <li>Controle de permissões;</li>
          <li>Comunicação segura entre aplicação e API;</li>
          <li>Uso de tokens de autenticação;</li>
          <li>Restrição de acesso por perfil.</li>
        </ul>

      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">9. Direitos dos titulares</h2>

        <ul className="privacy-text">
          <li>Solicitar acesso aos dados;</li>
          <li>Solicitar correção de informações;</li>
          <li>Solicitar informações sobre tratamento;</li>
          <li>Solicitar exclusão quando aplicável;</li>
          <li>Revogar consentimentos.</li>
        </ul>

      </section>


      <section className="privacy-card">
        <h2 className="privacy-text">10. Contato</h2>

        <p className="privacy-text">
          Para dúvidas relacionadas à privacidade ou tratamento de dados,
          entre em contato com a equipe responsável pelo desenvolvimento
          do projeto.
        </p>

        <footer>
          <strong className="privacy-text">Escala SEMURB</strong><br/>
          <p className="privacy-text"> Projeto acadêmico de demonstração da digitalização dos processos
          internos da SEMURB.</p>
        </footer>

      </section>
      <button className="cancel-button" onClick={(()=> route(-1))} >Fechar</button>

    </div>
  );
}

export default PrivacyPolicy;