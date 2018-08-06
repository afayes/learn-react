import * as Rx from 'rxjs/Rx';

const computerApi = {

    computers: [{id: 0, name: 'Mac Book Pro async2'}, {id: 1, name: 'HP async2'}],

    getComputers() {
        return Rx.Observable.of({computers: [...this.computers]});
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
        return Rx.Observable.of(foundComputer);
    },

    addComputer(computer) {
        computer.id = this.computers.length;
        this.computers.push(computer);
        return Rx.Observable.of(computer);
    },

    deleteComputer(computerId) {
        let index = this.computers.findIndex((computer) => computer.id === computerId);
        const computerToDelete = this.computers[index];
        this.computers.splice(index, 1);
        return Rx.Observable.of(computerToDelete);
    }
};

export default computerApi;
