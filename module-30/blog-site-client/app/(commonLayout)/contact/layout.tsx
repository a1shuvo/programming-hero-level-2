export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>This is contact layout</h1>
      {children}
    </div>
  );
}
