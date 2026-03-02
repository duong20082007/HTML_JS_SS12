let warriors = [
    { id: "W001", name: "Musashi", class: "Samurai", attack: 85, defense: 60 },
    { id: "W002", name: "Ragnar", class: "Viking", attack: 92, defense: 70 },
    { id: "W003", name: "Spartacus", class: "Gladiator", attack: 80, defense: 65 },
    { id: "W004", name: "Lancelot", class: "Knight", attack: 75, defense: 85 },
    { id: "W005", name: "Leonidas", class: "Spartan", attack: 88, defense: 72 }
];

const fullList = (list) => {
    console.log("--- DANH SÁCH CHIẾN BINH ---");
    let newArrWarrious = list.map(el => {
        return `id: ${el.id} ... \n`
    });
    console.log(newArrWarrious.join(""));
    
};

const addWarrior = (id, name, className, attack, defense) => {
    const validClasses = ['Samurai', 'Viking', 'Gladiator', 'Ninja', 'Knight', 'Spartan'];
    
    if (warriors.some(w => w.id === id)){
        return alert("ID đã tồn tại!");
    }
    if (warriors.some(w => w.name.toLowerCase() === name.toLowerCase())) {
        return alert("Tên chiến binh đã có trong guild.");
    }
    if (attack < 1 || attack > 100){
        return alert("Chỉ số tấn công không hợp lệ (1-100).");
    } 
    if (isNaN(defense) || defense < 0){
        return alert("Defense không thỏa mãn.");
    } 
    if (!validClasses.includes(className)){
        return alert("Class không hợp lệ.");
    } 

    warriors.push({ id, name, class: className, attack, defense });
    console.log(`Đã thêm chiến binh: ${name} vào guild!`);
};

const removeWarrior = (name) => {
    const index = warriors.findIndex(w => w.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        return alert(`Chiến binh ${name} không có trong guild.`);
    } 

    if (confirm(`Xác nhận xóa chiến binh ${name}?`)) {
        warriors.splice(index, 1);
        console.log(`Đã xóa chiến binh ${name} thành công!`);
    } else {
        console.log("Đã hủy thao tác xóa.");
    }
};

const updateWarrior = (name, newAttack, newDefense) => {
    const warrior = warriors.find(w => w.name.toLowerCase() === name.toLowerCase());
    if (!warrior) {
        return alert(`Chiến binh ${name} không có trong guild!`);
    }

    if (newAttack >= 1 && newAttack <= 100 && newDefense >= 0) {
        warrior.attack = newAttack;
        warrior.defense = newDefense;
        console.log(`Đã cập nhật chiến binh: ${name}`);
    } else {
        console.log("Thông số cập nhật không hợp lệ.");
    }
};

const searchWarrior = (query) => {
    const results = warriors.filter(w => 
        w.name.toLowerCase().includes(query.toLowerCase()) || 
        w.class.toLowerCase() === query.toLowerCase()
    );

    if (results.length === 0){
        return console.log(`Không tìm thấy kết quả cho: ${query}`);
    } 
    results.forEach(w => {
        console.log(`Chiến binh: ${w.name}, Class: ${w.class}, Attack: ${w.attack}, Defense: ${w.defense}`);
    });
};

const guildTotalPower = () => {
    const total = warriors.reduce((acc, w) => {
        acc.attack += w.attack;
        acc.defense += w.defense;
        return acc;
    }, { attack: 0, defense: 0 });  

    console.log(`Tổng sức mạnh guild: Tổng attack: ${total.attack} | Tổng defense: ${total.defense}`);
};

const sortGuild = (order = 'asc') => {
    const sorted = [...warriors].toSorted((a, b) => order === 'asc' ? a.attack - b.attack : b.attack - a.attack);
    fullList(sorted);
};

const checkClassBalance = () => {
    const validClasses = ['Samurai', 'Viking', 'Gladiator', 'Ninja', 'Knight', 'Spartan'];
    const counts = warriors.reduce((acc, w) => {
        acc[w.class] = (acc[w.class] || 0) + 1;
        return acc;
    }, );

    console.log("--- BÁO CÁO CLASS COVERAGE ---");
    validClasses.forEach(c => console.log(`${c}: ${counts[c] || 0} chiến binh`));

    const distinctClasses = Object.keys(counts).length;
    const total = warriors.length;

    Object.entries(counts).forEach(([className, count]) => {
        if (count / total >= 0.5) {
            console.log(`Cảnh báo: Guild thiên về class ${className} quá nhiều!`);
        }
    });

    if (distinctClasses < 3) {
        console.log("Guild thiếu đa dạng class!");
    } 
    else if (distinctClasses >= 4){
        console.log("Guild khá cân bằng về class!");
    } 
};

const simulateBattle = (name1, name2) => {
    const w1 = warriors.find(w => w.name.toLowerCase() === name1.toLowerCase());
    const w2 = warriors.find(w => w.name.toLowerCase() === name2.toLowerCase());

    if (!w1 || !w2){
        return console.error("Một hoặc cả hai chiến binh không tồn tại!");
    } 

    console.log(`Trận đấu: ${w1.name} (${w1.class}) vs ${w2.name} (${w2.class})`);

    const dmg1 = Math.floor(w1.attack - (w2.defense / 2));
    const dmg2 = Math.floor(w2.attack - (w1.defense / 2));

    const remainDef2 = Math.max(0, w2.defense - dmg1);
    const remainDef1 = Math.max(0, w1.defense - dmg2);

    console.log(`Hiệp 1: ${w1.name} tấn công → gây ${dmg1} sát thương cho ${w2.name} (defense còn ${remainDef2})`);
    console.log(`Hiệp 1: ${w2.name} phản công → gây ${dmg2} sát thương cho ${w1.name} (defense còn ${remainDef1})`);

    if (remainDef1 > remainDef2) {
        console.log(`Kết quả: ${w1.name} thắng! (defense còn lại: ${remainDef1} vs ${remainDef2})`);
    } else if (remainDef2 > remainDef1) {
        console.log(`Kết quả: ${w2.name} thắng! (defense còn lại: ${remainDef1} vs ${remainDef2})`);
    } else {
        console.log("Kết quả: Hòa!");
    }
};

let choice;
while (choice !== 0) {
    choice = +prompt(`
        1. Khởi tạo Guild - Hiển thị danh sách guild
        2. Thêm chiến binh
        3. Xóa chiến binh
        4. Cập nhật thông tin chiến binh
        5. Tìm kiếm chiến binh
        6. Tính tổng sức mạnh guild 
        7. Sắp xếp guild theo chỉ số 
        8. Kiểm tra độ cân bằng theo class
        9. Mô phỏng trận chiến 1vs1
        0. Thoát
        `);
    switch (choice) {
        case 1:
            fullList(warriors);
            break;
        case 2:
            const id = prompt("Nhập ID:");
            const name = prompt("Nhập tên:");
            const cls = prompt("Nhập Class:");
            const atk = +prompt("Nhập Attack:");
            const def = +prompt("Nhập Defense:");
            addWarrior(id, name, cls, atk, def);
            break;
        case 3:
            const nameDel = prompt("Nhập tên chiến binh muốn xóa:");
            removeWarrior(nameDel);
            break;
        case 4:
            const nameUp = prompt("Nhập tên muốn cập nhật:");
            const atkUp = +prompt("Nhập Attack mới:");
            const defUp = +prompt("Nhập Defense mới:");
            updateWarrior(nameUp, atkUp, defUp);
            break;
        case 5:
            const query = prompt("Nhập tên hoặc class muốn tìm:");
            searchWarrior(query);
            break;
        case 6:
            guildTotalPower(warriors);
            break;
        case 7:
            const order = prompt("Nhập 'asc' (tăng) hoặc 'desc' (giảm):");
            sortGuild(order);
            break;
        case 8:
            checkClassBalance(warriors);
            break;
        case 9:
            const n1 = prompt("Chiến binh 1:");
            const n2 = prompt("Chiến binh 2:");
            simulateBattle(n1, n2);
            break;
        case 0: 
            alert("Tạm biệt");
            break;
        default:
            alert("Mời bạn nhập lại");
            break;
    }
}