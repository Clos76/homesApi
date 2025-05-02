import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const homes = [
    { id: 1, title: 'Oceanview Villa', location: 'Rosarito', price: '$450,000', image: 'https://via.placeholder.com/300x200' },
    { id: 2, title: 'Beachfront Condo', location: 'Tijuana', price: '$320,000', image: 'https://via.placeholder.com/300x200' },
    { id: 3, title: 'Luxury Home', location: 'Ensenada', price: '$700,000', image: 'https://via.placeholder.com/300x200' },
];

const HomePage = () => {
    return (
        <div>
            {/* Header */}
            <header className="bg-primary text-white p-4 text-center">
                <h1>Rosarito Real Estate</h1>
                <p>Find your dream beachfront home</p>

                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/signup">Signup</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href='/dashboard'>Dashboard</a>
                    </li>
                </ul>
            </header>

            {/* Homes Grid */}
            <main className="container my-5">
                <div className="row">
                    {homes.map(home => (
                        <div key={home.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src={home.image} className="card-img-top" alt={home.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{home.title}</h5>
                                    <p className="card-text">{home.location}</p>
                                    <p className="card-text text-success fw-bold">{home.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-light text-center py-3 border-top">
                <small>&copy; {new Date().getFullYear()} Rosarito Real Estate. All rights reserved.</small>
            </footer>
        </div>
    );
};

export default HomePage;
