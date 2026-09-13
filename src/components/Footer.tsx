export default function Footer() {
  return (
    <footer className="w-full border-t p-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} KERAYUR. All rights reserved.
      </div>
    </footer>
  );
}
