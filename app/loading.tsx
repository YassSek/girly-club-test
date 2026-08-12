// Affiché instantanément pendant que la page d'accueil recharge les places
// disponibles depuis Supabase (elle refait cette requête à chaque visite,
// pour rester à jour) — évite l'impression de délai lors de la navigation.
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-bordeaux border-t-transparent" />
    </div>
  );
}
