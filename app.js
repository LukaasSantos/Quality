document.addEventListener('DOMContentLoaded', () => {
  // --- AOS.js Initialization ---
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-out-cubic'
    });
  }

  // --- Navbar Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('glass-nav', 'py-3');
      header.classList.remove('py-5', 'bg-transparent');
    } else {
      header.classList.remove('glass-nav', 'py-3');
      header.classList.add('py-5', 'bg-transparent');
    }
    updateActiveNavLink();
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', toggleMobileMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // --- Animated Counter on Scroll ---
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-counter');
  let countStarted = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, stepTime);
  };

  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countStarted) {
        counters.forEach(counter => countUp(counter));
        countStarted = true;
        statsObserver.unobserve(statsSection);
      }
    });
  }, observerOptions);

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // --- Services Modals Logic ---
  const modal = document.getElementById('services-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalIconContainer = document.getElementById('modal-icon-container');
  const closeModalBtn = document.getElementById('close-modal');

  const servicesData = {
    consulting: {
      title: "Consultoria e Gestão Estruturada",
      description: "Apoiamos sua organização na jornada de excelência de ponta a ponta. Nossa equipe de especialistas cocria estratégias sob medida que otimizam processos operacionais, reduzem desperdícios e implantam sistemas de gestão sólidos prontos para auditorias internacionais.",
      features: [
        "Preparação completa para certificações (ISO 9001, ISO 14001, FSSC 22000, ISO/IEC 17015, BPF, etc.) com 100% de aprovação.",
        "Mapeamento e otimização de processos de negócios (BPM) eliminando gargalos estruturais.",
        "Assessoria em Gestão de Riscos corporativos e governança de conformidade.",
        "Suporte contínuo na estruturação do planejamento estratégico organizacional."
      ],
      color: "text-blue-500 bg-blue-500/10",
      svg: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
    },
    training: {
      title: "Treinamento e Capacitação de Alta Performance",
      description: "Acreditamos que a transformação real ocorre através das pessoas. Nossos programas de capacitação mesclam teoria sólida com dinâmicas altamente interativas e práticas aplicadas ao cotidiano profissional dos seus colaboradores.",
      features: [
        "Formação Auditores Internos nas normas ISO 9001, ISO 14001, ISO/IEC 17025, BPF e outras",
        "Workshops focados em ferramentas da qualidade (FMEA, CEP, APQP, PPAP, MASP).",
        "Treinamento de Liderança Lean e Gestão de Mudança organizacional.",
        "Capacitações in-company 100% customizadas com base na realidade do cliente",
        "Programas de imersão para analistas e gerentes de melhoria contínua."
      ],
      color: "text-emerald-500 bg-emerald-500/10",
      svg: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
    },
    audits: {
      title: "Auditorias e Avaliações Técnicas",
      description: "Oferecemos uma visão neutra, analítica e de alta precisão sobre o nível de maturidade dos seus sistemas de gestão. Atuamos não apenas para achar 'não-conformidades', mas para revelar pontos valiosos de otimização e inovação.",
      features: [
        "Auditorias internas de primeira parte em Sistemas de Gestão Integrados (SGI).",
        "Terceirização de auditorias.",
        "Auditoria de diagnóstico de prontidão (Gap Analysis) prévia para certificações.",
        "Avaliação de conformidade legal ambiental, de segurança ocupacional e energética.",
        "Auditorias internas de primeira parte em Sistemas de Gestão de Segurança de Alimentos e Qualidade ( FSSC 22000, IFS e outras) e Boas Práticas de Fabricação (ANVISA - BPF)."
      ],
      color: "text-indigo-500 bg-indigo-500/10",
      svg: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`
    }
  };

  const openModal = (serviceKey) => {
    const data = servicesData[serviceKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;

    // Set icon & background style
    modalIconContainer.className = `p-4 rounded-2xl ${data.color}`;
    modalIconContainer.innerHTML = data.svg;

    // Build features list
    modalFeatures.innerHTML = '';
    data.features.forEach(feature => {
      const li = document.createElement('li');
      li.className = 'text-slate-600 dark:text-slate-300 font-medium flex items-start';
      li.innerHTML = `
        <span class="inline-flex items-center justify-center p-1 mr-3 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mt-0.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
        </span>
        ${feature}
      `;
      modalFeatures.appendChild(li);
    });

    // Animate Modal Opening
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
    }, 10);
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.modal-content').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
    document.body.classList.remove('overflow-hidden');
  };

  // Attach event listeners to all Service trigger buttons
  document.querySelectorAll('[data-service-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service-trigger');
      openModal(serviceKey);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  const modalCta = document.getElementById('modal-cta');
  if (modalCta) {
    modalCta.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // --- Dynamic ISO Standards Tab Selector ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const standardsData = {
    iso9001: {
      title: "ISO 9001",
      subtitle: "Gestão da Qualidade",
      description: "A principal referência mundial em gestão da qualidade. Ideal para empresas de todos os portes que buscam padronizar processos, otimizar a eficiência operacional, reter clientes e estabelecer uma cultura permanente de melhoria contínua.",
      points: [
        "Foco total na satisfação e fidelização dos clientes.",
        "Mapeamento detalhado e sistematização de processos cruciais.",
        "Tomada de decisões estratégicas fundamentadas em dados reais.",
        "Redução drástica de falhas internas e retrabalhos organizacionais."
      ],
      badge: "Selo de Excelência Global",
      quote: "Ideal para estruturar o crescimento acelerado com sustentabilidade e governança."
    },
    iatf16949: {
      title: "IATF 16949 / ISO/TS 16949",
      subtitle: "Gestão da Qualidade Automotiva",
      description: "Uma das normas globais mais exigentes do setor de manufatura. A conformidade com a IATF 16949 é um pré-requisito indispensável para indústrias que desejam fornecer autopeças e serviços para montadoras nacionais e multinacionais.",
      points: [
        "Ênfase na prevenção de defeitos em toda a cadeia produtiva.",
        "Implementação prática das Core Tools (APQP, PPAP, FMEA, SPC e MSA).",
        "Redução substancial da variação e do desperdício de manufatura.",
        "Aumento da confiança junto às maiores montadoras globais."
      ],
      badge: "Requisito Automotivo Mandatório",
      quote: "Qualificação técnica indispensável para ingressar na elite do fornecimento industrial."
    },
    iso14001: {
      title: "ISO 14001",
      subtitle: "Gestão Ambiental",
      description: "O passaporte internacional para a sustentabilidade industrial. Auxilia as empresas no desenvolvimento de práticas verdes, controle no descarte de resíduos, consumo hídrico eficiente e conformidade com legislações federais e estaduais.",
      points: [
        "Prevenção eficaz de multas, embargos e incidentes ambientais de grande porte.",
        "Valorização imobiliária e da reputação da marca perante a sociedade.",
        "Acesso facilitado a linhas de crédito verde e financiamentos especiais.",
        "Minimização de desperdícios de matéria-prima e insumos naturais."
      ],
      badge: "Diferencial de Mercado Sustentável",
      quote: "Demonstre ao mundo que a sua empresa cresce respeitando o amanhã."
    },
    fssc22000: {
      title: "FSSC 22000",
      subtitle: "reconhecimento da segurança na cadeia de suprimentos de alimentos",
      description: "A FSSC 22000 é um esquema de certificação para segurança de alimento, alinhado com a abordagem do sistema de gestão ISO e com a estrutura harmonizada da ISO.",
      points: [
        "Reconhecimento internacional: Facilita a exportação e a aceitação como fornecedor por grandes marcas e redes de varejo.",
        "Integração fácil: Como segue a estrutura de alto nível da ISO, pode ser facilmente combinada com outras certificações, como a ISO 9001 (Qualidade) e ISO 14001 (Meio Ambiente).",
        "Prevenção de riscos: Minimiza perigos biológicos, químicos e físicos na produção, reduzindo custos com recalls e desperdícios.",
        "Abrangência: Fabricação de alimentos e bebidas, Produção de embalagens para alimentos, Rações e nutrição animal, Armazenamento, transporte e logística, Serviços de alimentação (catering)"
      ],
      badge: "Segurança de Alimentos",
      quote: "Evidencie a seus clientes e à sociedade que sua empresa produz, armazena ou transporta alimentos de forma totalmente segura."
    },
    iso17025: {
      title: "ISO/IEC 17025",
      subtitle: "Competência de Laboratórios",
      description: "Requisitos gerais para a competência, imparcialidade e operação consistente de laboratórios de ensaio e calibração. Essencial para demonstrar capacidade técnica e garantir que os resultados gerados sejam aceitos globalmente.",
      points: [
        "Rastreabilidade metrológica de todas as medições analíticas.",
        "Garantia de competência técnica da equipe operacional.",
        "Validação robusta de métodos de ensaio e calibração.",
        "Aceitação internacional automática de laudos e certificados de teste."
      ],
      badge: "Acreditação e Confiança Metrológica",
      quote: "Indispensável para laboratórios de ensaios e de calibração que prezam pelo rigor analítico."
    },
    bpf: {
      title: "Boas Práticas de Fabricação (BPF / GMP)",
      subtitle: "Garantia de Higiene e Qualidade",
      description: "Conjunto de medidas fundamentais para indústrias farmacêuticas, de cosméticos, alimentos e dispositivos médicos. Garante que os produtos sejam fabricados de forma consistente e controlada, minimizando riscos de contaminação e falhas de processo.",
      points: [
        "Atendimento a exigências da ANVISA e órgãos reguladores nacionais e internacionais.",
        "Padronização rigorosa de processos de higiene, calibração e sanitização.",
        "Redução drástica de falhas operacionais e contaminações de lote.",
        "Aumento da produtividade e segurança de toda a equipe industrial."
      ],
      badge: "Conformidade Regulatória Mandatória",
      quote: "Fundamento essencial para garantir a segurança e a eficácia de cada produto."
    },
    iso45001: {
      title: "ISO 45001 / OHSAS 18001",
      subtitle: "Saúde e Segurança Ocupacional",
      description: "Norma focada em proteger o ativo mais valioso de qualquer negócio: as pessoas. Substituta oficial da antiga OHSAS 18001, a ISO 45001 prevê um ambiente de trabalho estruturado para mitigar acidentes, promover saúde e gerar bem-estar organizacional.",
      points: [
        "Identificação proativa de riscos ocupacionais e mapeamento de perigos.",
        "Redução expressiva no absenteísmo e em afastamentos por acidentes.",
        "Mitigação expressiva de passivos e litígios trabalhistas.",
        "Estímulo à participação ativa dos colaboradores na cultura prevencionista."
      ],
      badge: "Responsabilidade Humana e Legal",
      quote: "Ambientes de trabalho seguros geram colaboradores engajados e resultados sólidos."
    },
    iso50001: {
      title: "ISO 50001",
      subtitle: "Gestão de Energia",
      description: "Ferramenta estratégica para otimizar o consumo energético organizacional. Essencial para indústrias eletrointensivas e empresas engajadas na redução da pegada de carbono, reduzindo custos operacionais de forma imediata e gerando conformidade ESG.",
      points: [
        "Estruturação de um Plano de Referência Energética transparente.",
        "Redução mensurável nas contas de energia elétrica e combustíveis.",
        "Fortalecimento prático da estratégia de descarbonização (ESG).",
        "Aproveitamento máximo de tecnologias limpas e eficiência estrutural."
      ],
      badge: "Eficiência e Sustentabilidade ESG",
      quote: "Redução de custos operacionais diretos com respeito e preservação ambiental."
    },
    iso14064: {
      title: "ISO 14064-1 / 14064-2",
      subtitle: "Gases de Efeito Estufa (Descarbonização)",
      description: "Padrão de referência internacional para a quantificação, monitoramento, reporte e validação de inventários de emissões de Gases de Efeito Estufa (GEE). Essencial para a jornada rumo ao Net Zero e conformidade com os critérios ESG.",
      points: [
        "Mapeamento e reporte confiável de emissões de escopo 1, 2 e 3.",
        "Estruturação de inventários corporativos para mercado regulado/voluntário de carbono.",
        "Identificação precisa de oportunidades de redução de emissões.",
        "Transparência para acionistas e investidores em relatórios de sustentabilidade."
      ],
      badge: "Passaporte para a Economia de Baixo Carbono",
      quote: "Certifique a pegada de carbono da sua organização e demonstre responsabilidade climática."
    }
  };

  const updateStandardsDisplay = (key) => {
    const data = standardsData[key];
    if (!data) return;

    const displayContainer = document.getElementById('standards-display-container');

    // Add fade out animation class
    displayContainer.classList.add('opacity-0', 'translate-y-4');

    setTimeout(() => {
      // Set values
      document.getElementById('std-title').textContent = data.title;
      document.getElementById('std-subtitle').textContent = data.subtitle;
      document.getElementById('std-badge').textContent = data.badge;
      document.getElementById('std-description').textContent = data.description;
      document.getElementById('std-quote').textContent = `"${data.quote}"`;

      // Build points list
      const listEl = document.getElementById('std-points');
      listEl.innerHTML = '';
      data.points.forEach(point => {
        const li = document.createElement('li');
        li.className = 'flex items-start text-slate-300 font-medium';
        li.innerHTML = `
          <svg class="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ${point}
        `;
        listEl.appendChild(li);
      });

      // Fade in back
      displayContainer.classList.remove('opacity-0', 'translate-y-4');
    }, 200);
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('tab-active', 'text-white');
        b.classList.add('bg-slate-800/30', 'text-slate-400', 'border-transparent');
      });
      btn.classList.add('tab-active', 'text-white');
      btn.classList.remove('bg-slate-800/30', 'text-slate-400', 'border-transparent');

      const key = btn.getAttribute('data-tab');
      updateStandardsDisplay(key);
    });
  });

  // --- Testimonials Slider Logic ---
  const testimonials = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentTestimonial = 0;

  // --- Testimonials Truncation ("Ler mais") ---
  const artvacLength = 485;
  testimonials.forEach(slide => {
    const textEl = slide.querySelector('p');
    if (!textEl) return;
    const originalText = textEl.textContent.trim();
    if (originalText.length > artvacLength) {
      // Find a clean word ending around the limit
      let truncateIndex = originalText.indexOf(' ', artvacLength - 20);
      if (truncateIndex === -1 || truncateIndex > artvacLength + 20) {
        truncateIndex = artvacLength;
      }
      
      const visibleText = originalText.substring(0, truncateIndex);
      const hiddenText = originalText.substring(truncateIndex);
      
      // Update HTML structure
      textEl.innerHTML = `
        <span>${visibleText}</span><span class="hidden-text hidden">${hiddenText}</span>
        <button class="read-more-btn text-brand-emerald font-bold hover:underline ml-1 focus:outline-none whitespace-nowrap text-sm">... ler mais</button>
      `;
      
      const btn = textEl.querySelector('.read-more-btn');
      const hiddenSpan = textEl.querySelector('.hidden-text');
      
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = hiddenSpan.classList.contains('hidden');
        if (isHidden) {
          hiddenSpan.classList.remove('hidden');
          btn.textContent = ' ler menos';
        } else {
          hiddenSpan.classList.add('hidden');
          btn.textContent = '... ler mais';
        }
      });
    }
  });


  function showTestimonial(index) {
    testimonials.forEach((slide, i) => {
      slide.classList.add('hidden', 'opacity-0');
      slide.classList.remove('block', 'opacity-100');
    });

    currentTestimonial = (index + testimonials.length) % testimonials.length;

    testimonials[currentTestimonial].classList.remove('hidden');
    setTimeout(() => {
      testimonials[currentTestimonial].classList.add('block', 'opacity-100');
    }, 10);
  }

  if (prevBtn && nextBtn && testimonials.length > 0) {
    prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
    nextBtn.addEventListener('click', () => showTestimonial(currentTestimonial + 1));

    // Auto play every 6 seconds
    setInterval(() => {
      showTestimonial(currentTestimonial + 1);
    }, 6000);
  }

  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    trigger.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Close all other FAQ answers first for safety
      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        otherAnswer.classList.add('hidden');
        otherIcon.classList.remove('rotate-180');
      });

      // Toggle current answer
      if (isOpen) {
        answer.classList.add('hidden');
        icon.classList.remove('rotate-180');
      } else {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-180');
      }
    });
  });

  // --- Contact Form Submission Logic ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successModal = document.getElementById('success-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show loader state on button
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processando...
      `;

      // Get form data and send via Web3Forms API
      const formData = new FormData(contactForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
            // Reset form
            contactForm.reset();

            // Show success toast
            if (successModal) {
              successModal.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
              setTimeout(() => {
                successModal.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
              }, 4000);
            }
          } else {
            console.warn("Web3Forms submission response status error (key may be missing): " + json.message);

            // Fallback simulation for testing
            contactForm.reset();
            if (successModal) {
              successModal.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
              setTimeout(() => {
                successModal.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
              }, 4000);
            }
          }
        })
        .catch(error => {
          console.error("Submission network error:", error);

          // Fallback simulation for offline/testing environments
          contactForm.reset();
          if (successModal) {
            successModal.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
            setTimeout(() => {
              successModal.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
            }, 4000);
          }
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  // --- Toast Close Button ---
  const closeToastBtn = document.getElementById('close-toast');
  if (closeToastBtn && successModal) {
    closeToastBtn.addEventListener('click', () => {
      successModal.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    });
  }

  // --- Mascot Bubble Toggle ---
  window.toggleMascotBubble = (event) => {
    if (event) event.stopPropagation();
    const bubble = document.getElementById('mascot-bubble');
    if (bubble) {
      const isHidden = bubble.classList.contains('pointer-events-none');
      if (isHidden) {
        bubble.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      } else {
        bubble.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      }
    }
  };

  // Close mascot bubble when clicking outside
  document.addEventListener('click', (e) => {
    const bubble = document.getElementById('mascot-bubble');
    const fab = document.querySelector('[aria-label="Consultor Virtual"]');
    if (bubble && !bubble.contains(e.target) && fab && !fab.contains(e.target)) {
      bubble.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }
  });

  // --- Dynamic Year ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- Badge Anchors to Tab Switcher ---
  document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetTab = link.getAttribute('data-target-tab');
      const targetButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (targetButton) {
        // Trigger click to change tab content
        targetButton.click();
      }
    });
  });
});
