import Link from "next/link";
import React from "react";

export default function Accueil() {
    return (
            <div className="background-container">
                <div className="text-home">
                    <div className="titre-overlay">
                        <h1>Travel-Easy</h1> <br />
                        <h6>Trouver et Préparé votre randonné facilement</h6>
                    </div>

                    <div className="btn-home-contener">
                        <Link href={"/boutique"} className="btn-home">
                            Commencer Maintenant !
                        </Link>
                    </div>

                </div>
            </div>
    );
}