let serie = {
    nome: 'Stranger Things',
    genero: ['Drama', 'Suspense', 'terror',"adolecentes",'misterio', 'obra de epoca','romance', 'aventura', 'ficção cientifica'],
    ano: 2016,
    nr_temporadas: 5,
    episodios: [
        {temporada: 1,
            nr_episodio: 1,
            titulo: ' O Desaparecimento de Will Byers',
            duracao: '56 minutos'
        },
        {temporada: 1,
            nr_episodio: 2,
            titulo: 'A Estranha da Maple Street',
            duracao: '55 minutos'
        },
        {temporada: 1,
            nr_episodio: 3,
            titulo: 'Capítulo Três: Holly, Jolly',
            duracao: '52 minutos'
        },
    ]
};

console.log(serie.episodios[2].nr_episodio);
console.log(serie.episodios[2].titulo);
console.log(serie.episodios[2].duracao);
console.log(serie.genero);
