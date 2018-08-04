const computerApi = {

    computers: [{id: 0, name: 'Mac Book Pro async2'}, {id: 1, name: 'HP async2'}],

    getComputers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({computers: this.computers}), 200)
        });
    },

    saveComputer(computer) {
        if (typeof computer.id !== 'undefined') {
            return this.editComputer(computer)
        } else {
            return this.addComputer(computer);
        }
    },

    editComputer(computerWithEdit) {
        const foundComputer = this.computers.find((computer) => computer.id === computerWithEdit.id);
        Object.assign(foundComputer, computerWithEdit);
        return Promise.resolve(foundComputer);
    },

    addComputer(computer) {
        computer.id = this.computers.length;
        this.computers.push(computer);
        return Promise.resolve(computer);
    },

    deleteComputer(computerId) {
        let index = this.computers.findIndex((computer) => computer.id === computerId);
        const computerToDelete = this.computers[index];
        this.computers.splice(index, 1);
        return Promise.resolve(computerToDelete);
    }
};

export default computerApi;
