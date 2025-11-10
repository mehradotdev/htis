import { ChevronRight } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      title: 'Telecommunications',
      description: 'From 5G towers and fiber-to-the-home infrastructure to delivering cutting-edge digital infrastructure.',
      features: [
        '5G rollout & mobile network expansion',
        'Fiber-to-the-home for faster speed',
        'Network optimization & digital connectivity'
      ],
      stats: [
        { value: '10,000+', label: 'Towers Deployed' },
        { value: '10,000+', label: 'Homes Connected' },
        { value: '10,000+', label: 'Network Quality' }
      ]
    },
    {
      title: 'Networking',
      description: 'We design reliable, scalable network infrastructure that keeps systems connected.',
      features: [
        '5G infrastructure for future speed',
        'Network security & protection',
        'SD-WAN for better connectivity'
      ],
      stats: [
        { value: '10,000+', label: 'Networks Deployed' },
        { value: '10,000+', label: 'Security Incidents' },
        { value: '10,000+', label: 'Uptime Achieved' }
      ]
    },
    {
      title: 'IT & Software',
      description: 'Custom software solutions that enhance efficiency, streamline operations, and drive growth.',
      features: [
        'Custom software for business needs',
        'Cloud migration & digital transformation',
        'Business intelligence & data analytics'
      ],
      stats: [
        { value: '10,000+', label: 'Projects Delivered' },
        { value: '10,000+', label: 'Cloud Migrations' },
        { value: '10,000+', label: 'Cost Savings' }
      ]
    }
  ];

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Scalable Tech<br />Solutions for a<br />Connected Future
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            From 5G towers and fiber to network software, we build the infrastructure and systems that keep India's digital infrastructure advancing.
          </p>
          <p className="text-muted-foreground max-w-2xl mt-4">
            We build and upgrade systems that keep business and communities running today and prepared for tomorrow's technology.
          </p>
        </div>

        <div className="space-y-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="border border-border rounded-2xl p-8 hover:border-green-500/50 transition group"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-green-400 transition">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  <div className="space-y-3 mb-6">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition">
                    <span>Know More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:w-1/2 flex items-center">
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {solution.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-muted/50 border border-border rounded-xl p-6 hover:border-green-500/50 transition"
                      >
                        <div className="text-2xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
