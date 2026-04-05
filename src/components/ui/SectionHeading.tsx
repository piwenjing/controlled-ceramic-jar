interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gold?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  gold = true,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-10 md:mb-16">
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 ${
          gold ? "text-champagne-gold" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-300 text-base md:text-lg font-serif italic">{subtitle}</p>
      )}
    </div>
  );
}
