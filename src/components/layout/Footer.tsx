
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerNavigation = {
    mainLinks: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Support", href: "/support" }
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Contact Us", href: "/support#contact" },
      { name: "FAQs", href: "/support#faqs" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/about#careers" },
      { name: "Terms of Service", href: "/terms" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" }
  ];

  return (
    <footer className="bg-airline-dusty-blue border-t border-airline-soft-blue-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <Plane className="h-6 w-6 text-white mr-2" />
              <span className="text-2xl font-bold text-white">NAMMA</span>
              <span className="text-xl font-medium text-airline-light-beige ml-1">AIRLINES</span>
            </Link>
            <p className="mt-4 text-sm text-airline-light-beige max-w-md">
              Your reliable partner for domestic and international travel across India and beyond. 
              Experience comfort, safety and exceptional service with every journey.
            </p>
            <div className="flex mt-6 space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-airline-soft-blue-gray hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Navigate
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.mainLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-base text-airline-light-beige hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-base text-airline-light-beige hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Company & Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-base text-airline-light-beige hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-airline-soft-blue-gray pt-8">
          <p className="text-center text-sm text-airline-light-beige">
            &copy; {year} NAMMA AIRLINES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
