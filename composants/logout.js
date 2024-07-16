export default function handleLogout () {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };