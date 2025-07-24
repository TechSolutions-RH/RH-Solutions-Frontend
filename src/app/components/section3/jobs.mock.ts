export interface Job {
  title: string;
  location: string;
  description: string;
}

export interface JobCategory {
  name: string;
  jobs: Job[];
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    name: 'Desenvolvimento',
    jobs: [
      {
        title: 'Desenvolvedor Web',
        location: 'Remoto',
        description:
          'Estamos em busca de um Desenvolvedor Web apaixonado por tecnologia. O candidato ideal deve ter experiência em JavaScript e frameworks modernos. Junte-se a nós e faça parte de um time inovador!',
      },
      {
        title: 'Analista de Dados',
        location: 'Maceió',
        description:
          'Procuramos um Analista de Dados que possa transformar informações em insights valiosos. Se você tem habilidades em SQL e análise estatística, queremos você na nossa equipe. Venha contribuir para decisões estratégicas!',
      },
      {
        title: 'Desenvolvedor Mobile',
        location: 'Remoto ou Maceió',
        description:
          'Buscamos um Desenvolvedor Mobile para criar aplicativos inovadores em Flutter ou React Native. É desejável experiência com publicação nas lojas (App Store/Google Play) e integração com APIs REST. Venha construir soluções mobile com a gente!',
      },
    ],
  },
  {
    name: 'Marketing',
    jobs: [
      {
        title: 'Designer Gráfico',
        location: 'Remoto',
        description:
          'Estamos em busca de um Designer Gráfico criativo e talentoso. O candidato ideal deve ter experiência em ferramentas como Photoshop e Illustrator. Junte-se a nós para criar designs incríveis!',
      },
      {
        title: 'UX/UI Designer',
        location: 'Maceió',
        description:
          'Procuramos um UX/UI Designer que possa melhorar a experiência do usuário em nossos produtos. Se você tem um portfólio forte e experiência em design centrado no usuário, queremos você na nossa equipe!',
      },
    ],
  }
];