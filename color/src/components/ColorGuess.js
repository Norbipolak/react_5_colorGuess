import { useState, useRef } from "react";

function ColorGuess() {
    const [colors, setColors] = useState([]);
    //Ebben a tömbbe fogjunk menteni, hogy milyen színeink vannak, amiket generáltunk és ki kell majd őket találni!!
    const [guessColor, setGuessColor] = useState(0);
    //ez lesz majd a szín, amit ki kell majd találni!!
    const [level, setLevel] = useState(0);
    //lesz majd 3 level, amin játszani fogunk, az első generál nekünk 3 színt, a második 6-ot és a harmadik level meg 9-et 
    const [points, setPoints] = useState(0);
    //ezek pontok, hogyha pontosan eltaláltuk a színt akkor egyel növekszik majd a points 
    const [fails, setFails] = useState(0);
    //ez meg amikor nem a helyesre kattintunk, akkor ezt fogjuk majd növelni egyel! 
    const [errors, setErrors] = useState([]);
    //ha nem választunk ki szintet vagy pl. nem adtunk meg egy tippet sem, akkor ezeket a hibákat majd kiírjuk!!!!
    const [guessedOrNot, setGuessedOrNot] = useState(false);
    //megadtuk már-e a tippünket vagy sem!!! 
    
    const levelRef = useRef(null); 

    /*
    Ebben a függvényben fogjuk majd legenrálni a színeinket, fontos, hogy majd itt használni kell a level változót generálásnál, mert attól fog 
    függeni, hogy mennyi szín kell majd 

    Amivel kezdünk mint mindig, meg kell nézni, hogy vannak-e hibáink és ha igen, akkor ezeket ki kell majd írni és csak akkor megyünk tovább 
    ha nincsenek hibáink!!!! tehát ha az errors useState-s változó, amiben gyöjtjük majd a hibákat az üres lesz, tehát .length az nulla!!!! 

    utána kell csinálni egy színeket, ehhez kell egy üres tömb, amibe majd beletesszük őket és majd ha benne vannak akkor ezzel a tömbbel 
    fogjuk frissíteni a colors useState-s áltozónkat, ami szinten ugye egy tömb 
    kell egy for és itt nagyon fontos, hogy addig menjen, hogy 3*level, mert majd a level fogja meghatározni, hogy mennyi szinünk van 
    és ez majd egy select, option-ös dologból fog származni amit a felhasználó kiválaszt és itt meg a level useState-s változóban lesz elmentve
    utána minden egyes körben generálunk egy színt, amit megcsináltunk a ColorGenerator-ban és elmentjük ide egy lokális változóba, majd 
    belerakjuk a tömbbe, amit csináltunk és ez a folyamat, attól függően, hogy mi level, le fog futni 3*level-szer!!! 
    */ 
    const generateColors = ()=> {
        const es = [];

        //ha nem választjuk ki a szintet
        if(level === 0) {
            es.push("Nem választottad ki a szintet!");
        }

        //ha úgy probálnánk továbbmenni, hogy nem tippeltünk, erre van ez a guessedOrNot useState-s változó  
        if(!guessedOrNot) {
            es.push("Nem adtad meg a tippedet!");
        }

        //megadjuk itt tömböt a useState-s változónak, amikor már az es-ben belepush-oltunk mindent 
        setErrors(es);

        //ha az es-nek a length-je nem nulla, akkor nem megyünk tovább, mert azt jelenti, hogy van valamilyen hibánk
        if(es.length !== 0) 
            return;

        /*
        ugyanez a teknikát fogjuk alkalmazni, vagyis hasonlóat, amikor generáljuk le a színeket, kell egy üres tömb és abba bele 
        kell rakni annyi színt, amennyi a szintnek kell(3, 6, 9) ehhez kell egy for meg itt kell meghívni a ColorGenerator-t is!!!
        */ 
        const c = [];
        /*
        Ezt csak azért csináltuk és set-eltünk egy random számmal a GuessColor-t és fontos, hogy itt legyen a level!!! 
        mert ez a szám is változni fog, attól függően, hogy melyik level-en vagyunk és változnia is kell, mert -> colors[guessColor]
        ez lesz a szín, amit ki kell találni, tehát a colors, amiben vannak a színeink, onnan egy véletlen a guessColor-adik szín!!!!!!
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        */
        setGuessColor(Math.floor(Math.random()*3*level));

        //for!! fontos, hogy meddig menjen!! 
        for(let i = 0; i < 3*level; i++) {
            //minden egyes körben meghívjuk ez a ColorGenerator-t, ami készít nekünk egy random rgb kódot!!! 
            const color = ColorGenerator();
            //és ugye minden körben csinál egy kódot, amit belerakunk a c tömbbe, amit itt a for-on kivül létrehoztunk!!! 
            c.push(color);
        }
        //itt meg ezt a c tömbtöt set-eljük a colors-nak useState-nek, ha meg van minden színünk 
        setColors(c);
        setGuessedOrNot(false);
    };

    /*
    ez a függvény majd azt nézi meg, hogy eltaléltuk-e a színt, amire kattitottunk, ez úgy lesz, hogy majd végigmegyünk a colors-on, amikor 
    megjelenítjük őket és a div-re amikben meg lesznek ezek jelenítve, ott majd lesz egy onClick és ez a függvény vár egy index-et, hogy 
    tudja, hogy melyik színre kattintottunk rá és ezt ott meghívjuk és a map miatt meg is tudjuk neki adni ezt az indexet!!!!! 

    és ha meg van, hogy melyikre kattintunk rá, tehát mi arra kattinunk rá, amit ez a függvény meg kap azt az index-üt, akkor ezt az index-et 
    hozzá guessColor-val és akkor ha ez megegyzik akkor növekszik a pont ha meg nem talátuk el, akkor meg növekszik a fails és ilyenkor 
    mindig továbbmegyünk csak egyet lehet majd tippelni 
    
    meghívjuk itt a generateColors-t meg, mivel már csináltunk egy guess-t, ezért a guessedOrNot is true lesz!!! 
    illetve kiürítjük itt az errors tömböt 
    */ 
    const clickColor = (i)=> {
        //itt attól függően, hogy eltaláltuk-e a színt kapunk egy point-ot vagy fail-t 
        if(i === guessColor) 
            setPoints(p=>p+1);
        else
            setFails(f=>f+1);

        generateColors();
        setGuessedOrNot(true);
        setErrors([]);
    };

    /*
    newgame-nél meg kiürítünk mindent 
    */
    const newGame = ()=> {
        setColors([]);
        setGuessColor(true);
        setErrors([]);
        setGuessColor(-1);
        setPoints(0);
        setFails(0);
    };

    return(
        <div className="container">
            <div className="errors">
                {
                    errors.map((e, i)=><h3 key={i} style={{color:"red"}}>{e}</h3>)
                }
            </div>
            <div className="display">
                <div className="display-box">
                    Pontok: {points} -
                    Hibák: {fails}
                </div>
                <div className="display-box">
                    Szín: {colors[guessColor]}
                </div>
            </div>
            <div className="color-boxes">
                {
                    colors.map((c, i)=>
                        <div key={i} className="color-box"
                        onClick={()=>clickColor(i)} 
                        style={{backgroundColor:c}}></div>
                    )
                }
            </div>

            <select ref={levelRef} onChange={(e)=>setLevel(parseInt(e.target.value))}>
                <option value={0}>Válassz szintet!</option>
                <option value={1}>Szint 1</option>
                <option value={2}>Szint 2</option>
                <option value={3}>Szint 3</option>
            </select>
        </div>
    );
}

export default ColorGuess;