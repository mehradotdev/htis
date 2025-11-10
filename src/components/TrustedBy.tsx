export default function TrustedBy() {
  const partners = [
    'DELL EMC',
    'ORACLE',
    'APsystems',
    'Bharat',
    'UiPath',
    'Honeywell',
    'NOKIA',
    'ERICSON'
  ];

  return (
    <div className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-muted-foreground text-sm mb-8">
          Trusted by 100+ Clients and Partners
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-muted-foreground text-xl font-semibold hover:text-foreground transition"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
