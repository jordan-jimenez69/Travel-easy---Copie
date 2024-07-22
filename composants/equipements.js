import Link from "next/link";
import React from "react";

export default function Equipement() {
    return (
        <>
            <div className="titre-and-equipement">
                <div className="titre-equipement">
                    <h3>Nos équipements</h3>
                </div>

                <div className="trait"></div>

                <section className="list-equipement">

                    <div className="equipement">
                        <h1>Chaussures</h1>
                        <img className="img-list-equip" src="chaussure.jpg" />
                        <Link className="btn-equipement" href={"/categorie/6634eed756190cda6353ef11"}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement">
                        <h1>Sac à dos</h1>
                        <img className="img-list-equip" src="sac.jpg" />
                        <Link className="btn-equipement" href={"/categorie/6634ef6c56190cda6353ef1c"}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement">
                        <h1>Tentes</h1>
                        <img className="img-list-equip" src="tente.jpg" />
                        <Link className="btn-equipement" href={"/categorie/6634eecc56190cda6353ef0e"}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement">
                        <h1>Lit / Sac de couchage</h1>
                        <img className="img-list-equip" src="lit.jpg" />
                        <Link className="btn-equipement" href={"/categorie/6634eefd56190cda6353ef14"}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement">
                        <h1>Vêtements</h1>
                        <img className="img-list-equip" src="blouson.jpg" />
                        <Link className="btn-equipement" href={"/categorie/6634eed756190cda6353ef11"}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement voir-plus">
                        <h1 className="text-equip-plus">Accédez à notre <span>catalogue</span> complet ici !</h1>
                        <Link className="text-voirplus" href={"../boutique"}>
                            Découvrez tout les équipements
                            <div className="fleche-voirplus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </section>



            </div>
        </>
    );
}