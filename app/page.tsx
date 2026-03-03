'use client';
import './home.css';
import contactInfo from './constants/contatInfo.json';
import { HeroProjectList } from './components/ProjectList/ProjectList';
import Link from 'next/link';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from './constants/motionVariants';

export default function Home() {
  const scrollToManifesto = () => {
    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
      const y =
        manifestoSection.getBoundingClientRect().top + window.pageYOffset - 56;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  return (
    <>
      <motion.section
        id="hero"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h1 variants={itemVariants}>
          Designer{' '}
          <em
            className="highlight"
            data-cursor-text="E o que é isso?"
            data-cursor-icon="arrow-down"
            data-cursor-icon-pos="after"
            onClick={scrollToManifesto}
          >
            full-stack
          </em>{' '}
          que{' '}
          <span data-cursor-icon="idea" data-cursor-icon-pos="only">
            planeja
          </span>
          ,{' '}
          <span data-cursor-icon="pencil" data-cursor-icon-pos="only">
            projeta
          </span>
          ,{' '}
          <span data-cursor-icon="code" data-cursor-icon-pos="only">
            desenvolve
          </span>{' '}
          e{' '}
          <span data-cursor-icon="search" data-cursor-icon-pos="only">
            refina
          </span>{' '}
          produtos digitais
        </motion.h1>
        <motion.ul variants={itemVariants} className="areas horizontal">
          <li>Arquitetura da Informação</li>
          <li>UX/UI</li>
          <li>Gráfico & Editorial</li>
          <li>Front-end</li>
        </motion.ul>
        <motion.ul variants={itemVariants} className="contact-info horizontal">
          {contactInfo.map((contact) => (
            <li key={contact.name}>
              <a
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                {contact.name}
              </a>
            </li>
          ))}
        </motion.ul>
        <motion.button className="btn primary-btn" variants={itemVariants}>
          Entre em contato
        </motion.button>
        <motion.button className="btn secondary-btn" variants={itemVariants}>
          Currículo
        </motion.button>
      </motion.section>

      <motion.section
        className="content-grid full-width"
        id="projects"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <HeroProjectList style="grid" />
      </motion.section>

      <motion.section
        className="content-grid full-width"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        id="manifesto"
      >
        <motion.h2 variants={itemVariants}>
          Design do diagrama ao commit
        </motion.h2>
        <motion.p variants={itemVariants}>
          Acredito que a eficiência de um produto (que aqui não limito ao)
          digital nasce na intersecção de três disciplinas que alguns acham que
          conversam bem. Meu papel é garantir que essa conversa seja fluida:
        </motion.p>

        {/* TODO: componentizar (socorro) */}
        <motion.ul
          className="breakout"
          id="manifesto-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          <motion.li variants={itemVariants} data-cursor-text="A ideia">
            <motion.h3 variants={itemVariants}>Planejar</motion.h3>
            <motion.p variants={itemVariants} className="manifesto-subtitle">
              Pesquisa e estratégia
            </motion.p>

            <motion.p variants={itemVariants}>
              Muito antes de pensar em telas, vem a lógica interna. Estruturo
              sistemas de informação, taxonomias e fluxos que reduzem a carga
              cognitiva.
            </motion.p>
            <motion.p variants={itemVariants} className="manifesto-value">
              Menos abandono por confusão e uma base sólida para escalar
              funcionalidades.
            </motion.p>
            <motion.span
              variants={itemVariants}
              aria-hidden="true"
              className="highlight-text"
            >{`//////////////`}</motion.span>
          </motion.li>
          <motion.li variants={itemVariants} data-cursor-text="A planta baixa">
            <motion.h3 variants={itemVariants}>Projetar</motion.h3>
            <motion.p variants={itemVariants} className="manifesto-subtitle">
              Rigor técnico e estético
            </motion.p>
            <motion.p variants={itemVariants}>
              Trato a interface com a precisão do design gráfico clássico.
              Tipografia, grid e hierarquia visual não são decorativos; são
              ferramentas de usabilidade.
            </motion.p>
            <motion.p variants={itemVariants} className="manifesto-value">
              Um projeto de interface que transmite confiança e guia o olhar do
              usuário com intenção.
            </motion.p>
            <motion.span
              variants={itemVariants}
              aria-hidden="true"
              className="highlight-text"
            >{`//////////////`}</motion.span>
          </motion.li>
          <motion.li variants={itemVariants} data-cursor-text="A construção">
            <motion.h3 variants={itemVariants}>Desenvolver</motion.h3>
            <motion.p variants={itemVariants} className="manifesto-subtitle">
              Design que respeita o código
            </motion.p>

            <motion.p variants={itemVariants}>
              Como desenvolvedor front-end, reduzo o atrito entre o protótipo e
              o código real. Busco garantir que interações, acessibilidade e
              performance sejam nativas.
            </motion.p>
            <motion.p variants={itemVariants} className="manifesto-value">
              Redução drástica no retrabalho e um produto que chega ao mercado
              fiel ao projeto original.
            </motion.p>
            <motion.span
              variants={itemVariants}
              aria-hidden="true"
              className="highlight-text"
            >{`//////////////`}</motion.span>
          </motion.li>
          <motion.li variants={itemVariants} data-cursor-text="A vistoria">
            <motion.h3 variants={itemVariants}>Avaliar</motion.h3>
            <motion.p variants={itemVariants} className="manifesto-subtitle">
              Qualidade e Refinamento Contínuo
            </motion.p>

            <motion.p variants={itemVariants}>
              Garantia da qualidade de implementação, seja no redesign um
              produto ou validação de uma solução desenvolvida.
            </motion.p>
            <motion.p variants={itemVariants} className="manifesto-value">
              Ciclos de melhoria baseados em evidências, garantindo a evolução
              constante do produto.
            </motion.p>
            <motion.span
              variants={itemVariants}
              aria-hidden="true"
              className="highlight-text"
            >{`//////////////`}</motion.span>
          </motion.li>
        </motion.ul>
      </motion.section>

      <motion.section
        className="full-width"
        id="cta"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        <motion.h2 variants={itemVariants}>
          A busca por um perfil full-stack termina aqui{' '}
        </motion.h2>
        <motion.p variants={itemVariants}>
          Estou sempre aberto a discutir novos projetos, ideias criativas ou
          oportunidades de colaboração &mdash; da estratégia até a
          implementação. Sinta-se à vontade para me enviar uma mensagem!
        </motion.p>
        <motion.ul variants={itemVariants}>
          <motion.li variants={itemVariants}>
            <Link href="/contato" className="btn primary-btn">
              Enviar mensagem
            </Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/projetos" className="btn secondary-btn">
              Ver projetos
            </Link>
          </motion.li>
        </motion.ul>
      </motion.section>
    </>
  );
}
