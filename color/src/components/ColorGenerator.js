function ColorGenerator() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);

    return `rgb(${r}${g}${b})`;
}

export default ColorGenerator; 

/*
Így csinálunk egy random színgenerátort, hogy a szokásos Math.floor és abban a Math.random() és ezt meg szoroztuk 256, mert az rgb kódok azok 
0-256-ig mennek és akkor így nem is kell hozzáadni egyet vagy ilyesmi

amit meg ez a függvény visszaad az egy rgb() kód és ez lesz valami és minden meghívásnál ez generál nekünk új színeket!! 
*/