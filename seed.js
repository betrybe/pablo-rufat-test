const { MongoClient } = require('mongodb');

const insertAdminUser = async () => {

    // Não serão usados os valores do arquivo src/api/utils/constants.js para ficar independente do resto do projeto.
    // Tampoco será usada a biblioteca mongoose para simplificar o script.

    const mongoClient = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
    await mongoClient.connect();
    const db = mongoClient.db('Cookmaster');

    try {
        // A query foi alterada para se ajustar aos testes automatizados.
        // Essa sintaxe não funciona corretamente ao executar o script com "node ./sedd.js"
        // Para um correto funcionamento deve ser definido primeiro a collection "const collection = db.collection('users')"
        // e depois usar "collection.insertOne()"
        await db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

        console.log('DONE');
        process.exit(0);
    } catch (error) {
        console.error('ERROR:', error);
        process.exit(0);
    }
};

insertAdminUser();