let ids = 0;
let clients = [];

module.exports = {
    new(nome, email, celular) {
        let task = {id: ++ids, nome: nome, email: email, celular: celular};
        clients.push(task);
        return task;
    },
    update (id, nome) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            clients[pos].nome = nome;
        }
        return clients[pos]
    },
    list() {
        return clients;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return clients[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<clients.length; i++) {
            if (clients[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            clients.splice(i, 1);
            return true;
        }
        return false; 
    }
}