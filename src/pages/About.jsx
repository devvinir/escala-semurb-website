import "../styles/About.css";
import { useNavigate } from "react-router-dom"

function About() {

    const route = useNavigate()


    return (
        <div className="about-container">

            <header className="about-header">
                <h1>Sobre o Escala SEMURB</h1>
                <p className='about-text'>
                    Digitalização e otimização do gerenciamento de escalas
                </p>
            </header>


            <section className="about-card">

                <h2 className="">Contexto</h2>

                <p className="about-text">
                    O gerenciamento de escalas de trabalho em órgãos públicos envolve uma grande quantidade de informações relacionadas a funcionários, equipes, turnos e jornadas. Quando esses processos são realizados manualmente, podem ocorrer dificuldades como perda de informações, demora na atualização das escalas e maior possibilidade de erros administrativos.

                    O Escala SEMURB surgiu como uma proposta de modernização desses processos, utilizando tecnologia para centralizar informações e facilitar o acompanhamento das escalas.
                </p>

            </section>

            <section className="about-card">

                <h2 className="">Motivação</h2>

                <p className="about-text">
                    A criação do Escala SEMURB foi motivada pela necessidade de transformar processos tradicionalmente realizados de forma manual em uma solução digital, proporcionando maior organização, acessibilidade e eficiência para gestores e funcionários.
                </p>

            </section>

            <section className="about-card">

                <h2 className="">Público Alvo</h2>

                <p className="about-text">
                    O sistema foi desenvolvido para atender diferentes perfis de usuários:
                </p>

                <h3 className="about-text">Funcionários:</h3>

                <ul className="about-text">
                    <li className="">Consulta de escalas individuais;</li>
                    <li className="">Visualização de horários;</li>
                    <li className="">Acompanhamento de folgas e alterações.</li>
                </ul>

                <h3 className="about-text">Administradores:</h3>

                <ul className="about-text">
                    <li className="">Gerenciamento de funcionários;</li>
                    <li className="">Controle de setores e equipes;</li>
                    <li className="">Administração de escalas e turnos;</li>
                    <li className="">Geração de relatórios.</li>
                </ul>

            </section>

            <section className="about-card">

                <h2 className="">Proposta de Valor</h2>

                <p className="about-text">
                    O Escala SEMURB apresenta como diferenciais:
                </p>

               

                <ul className="about-text">
                    <li className="">Centralização das informações de escala em uma única plataforma;</li>
                    <li className="">Redução da dependência de documentos físicos;</li>
                    <li className="">Atualização das informações em tempo real;</li>
                    <li className="">Controle de acesso conforme perfil do usuário;</li>
                    <li className="">Interface adaptada para facilitar a consulta das informações.</li>
                </ul>

            </section>

            <section className='about-card'>
                <h2>O projeto</h2>

                <p className='about-text'>
                    O <strong>Escala SEMURB</strong> é um sistema web desenvolvido
                    como projeto acadêmico com o objetivo de demonstrar a
                    digitalização dos processos internos da Secretaria de
                    Mobilidade Urbana (SEMURB).
                </p>

                <p className='about-text'>
                    A plataforma foi criada para substituir processos manuais
                    relacionados ao gerenciamento de escalas de trabalho,
                    proporcionando uma forma mais organizada, rápida e acessível
                    para consulta e administração das informações.
                </p>

            </section>


            <section className="about-card">

                <h2>Objetivo</h2>

                <p className='about-text'>
                    O principal objetivo do sistema é facilitar o controle das
                    escalas dos funcionários, permitindo que informações como
                    turnos, horários, folgas e equipes sejam gerenciadas de
                    maneira centralizada e eficiente.
                </p>

                <p className='about-text'>
                    A solução busca reduzir o uso de processos manuais,
                    diminuir erros administrativos e melhorar a comunicação
                    entre gestores e funcionários.
                </p>

            </section>


            <section className="about-card">

                <h2>Principais funcionalidades</h2>

                <div className="features-grid">

                    <div className="feature">
                        <h3 className='about-text'> Consulta de escala</h3>
                        <p className='about-text'>
                            Visualização de dias trabalhados, folgas,
                            feriados e alterações na escala.
                        </p>
                    </div>


                    <div className="feature">
                        <h3 className='about-text'> Gestão de funcionários</h3>
                        <p className='about-text'>
                            Cadastro e gerenciamento de funcionários,
                            equipes e setores.
                        </p>
                    </div>


                    <div className="feature">
                        <h3 className='about-text'> Controle de turnos</h3>
                        <p className='about-text'>
                            Organização de horários, jornadas e intervalos.
                        </p>
                    </div>


                    <div className="feature">
                        <h3 className='about-text'> Relatórios administrativos</h3>
                        <p className='about-text'>
                            Geração de informações para auxiliar a gestão.
                        </p>
                    </div>

                </div>

            </section>


            <section className="about-card">

                <h2>Tecnologias utilizadas</h2>

                <div className="tech-list">

                    <span>React</span>
                    <span>Vite</span>
                    <span>Axios</span>
                    <span>JavaScript</span>
                    <span>API REST</span>
                    <span>Supabase</span>

                </div>

            </section>


            <section className="about-card">

                <h2>Impacto esperado</h2>

                <p className='about-text'>
                    O Escala SEMURB demonstra como a aplicação da tecnologia
                    pode contribuir para modernização dos processos
                    administrativos, promovendo maior organização,
                    transparência e eficiência na gestão das escalas de trabalho.
                </p>

            </section>


            <footer className="about-footer">

                <strong className='about-text'>Escala SEMURB</strong>

                <p className='about-text'>
                    Projeto acadêmico  da transformação digital
                    aplicada à gestão pública.
                </p>

            </footer>

            <button className="cancel-button" onClick={(() => route(-1))} >Fechar</button>

        </div>
    );
}

export default About;