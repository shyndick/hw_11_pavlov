// делал по образцу влада, не понял 106 строку.




class User {
    constructor({id, name, email, addres, phone}){
        this.data = {
            // id: userData.id,
            // name: userData.name,
            // email: userData.email,
            // addres:userData.addres,
            // phone: userData.phone

            id,
            name,
            email,
            addres,
            phone,
        }
    }

    edit(data){
        this.data = data
    }

    get get(){
        return this.data
    }
}

class Contacts{
    constructor() {
        this.data=[];
    }

    add(name, email, addres, phone) {
        let newUser = {
            id: `${Math.round(performance.now())}`,
            name: name,
            email: email,
            addres: addres,
            phone: phone
        }

        this.data.push(newUser);
    }

    edit(id, newObj) {
        let obj = this.data.find((element)=>{
            if(element.get.id===id) {
                return element
            }
        })
        obj.edit(newObj)
    }

    remove(id){
        this.data=this.data.filter((element)=>{
            return element.get.id!==id;
        });
    }
    get get(){
        return this.data;
    }
}

class ContactsApp extends Contacts {
    constructor(){
        super()
        this.init()
    }

    init() {
        let site = document.querySelector('.site');
        let container = document.createElement('div')
        container.classList.add('container');
        container.innerHTML = `<div class ="contacts">
                                    <div class = "header">
                                        <h2>Контакты</h2>
                                    </div>
                                    <div class = "main">
                                        <button class = "add_button">Добавить</button>
                                        <ul class ="contacts_items"></ul>
                                    </div>
                                </div>`
        site.appendChild(container)
        this.clickAddButton()
        this.get()

    }

    findInput(){
        let nameInput = document.querySelector('.name_input')
        let emailInput=document.querySelector('.email_input');
        let addresInput=document.querySelector('.addres_input');
        let phoneInput=document.querySelector('.phone_input');
        return [nameInput,emailInput,addresInput,phoneInput];
    }

    get(){
        const ul = document.querySelector('.contacts_items');
        let li = '';
        let list = super.get;
        list.forEach((element)=>{
            let {id,name,email,addres,phone}=element.get;
            li+=` <li class="contact_book_item" id='${id}'>
                        <p class="contacts_info">
                            Имя: ${name}<br>
                            Email: ${email}<br>
                            Адрес: ${addres}<br>
                            Телефон: ${phone}<br>
                        </p>
                        <button class="btn edit_btn" data-edit="${id}">Редактировать</button>
                        <button class="btn del_btn" data-del="${id}">Удалить</button>
                    </li>`
        })
        ul.innerHTML=li;
    }


    clickAddButton() {
        let add_button = document.querySelector('.add_button');
        add_button.addEventListener('click',()=>{
            let modalWindow= this.openModal()
            this.onAdd(modalWindow);
        })
    }

    openModal(id) {
        let info = '';
        
        if(id!==undefined){
            info=this.data.find((element)=>{
                if(element.get.id===id){
                    return element;
                }
            });
            info=info.get;
        }

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `<div class="modal_field">
                                <h2 class='main_field_title'>
                                    Введите данные для добавления
                                </h2>
                                <div class="main_field_info">
                                    <label class="info_label">Имя:</label>
                                    <input class='name_input' type='text' >
                                    <label class="info_label">Email:</label>
                                    <input class='email_input' type="email">
                                    <label class="info_label">Адрес:</label>
                                    <input class='addres_input' type='text'>
                                    <label class="info_label">Телефон:</label>
                                    <input class='phone_input' type='tel'>
                                    <div class="buttons">
                                        <button class="add_btn_modal">Добавить</button>
                                    </div>
                                </div>
                            </div>`;
        document.body.appendChild(modal);                    
    }


    onAdd() {
        const addButton = document.querySelector('.add_btn_modal');
    
        addButton.addEventListener('click', ()=>{
            console.log(addButton)
            let inputs = this.findInput();
            let name = inputs[0].value;
            let email=inputs[1].value;
            let addres=inputs[2].value;
            let phone=inputs[3].value;
            this.add(name, email, addres, phone);
            this.get()
        })
    }



}

const user3 = new ContactsApp()
