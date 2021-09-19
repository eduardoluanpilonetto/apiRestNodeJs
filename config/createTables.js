const models = [
    require('../app/tables/tableCompanies'),
    require('../app/tables/tableUsers'),
    require('../app/tables/tableProducts')
]

async function criarTabelas(){
    for(let contador = 0; contador < models.length; contador+=1){
        const model = models[contador]
        await model.sync()
    }
}

criarTabelas();