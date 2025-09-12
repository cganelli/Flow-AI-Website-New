"use client";

import Image from "next/image";
import Link from "next/link";

const BusinessOwnersSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <h2 className="heading-lg mb-4 text-center">
          Business owners are watching
        </h2>
        <p className="text-center text-xl mb-12">(500K+ Views on AI Automation)</p>

        {/* TikTok Icon */}
        <div className="text-center mb-8">
          <Image
            src="https://ext.same-assets.com/200566027/1367661487.svg"
            alt="TikTok"
            width={48}
            height={48}
            className="mx-auto"
          />
        </div>

        <div className="max-w-2xl mx-auto text-center p-6 md:p-8 bg-white border border-gray/10 rounded-xl shadow-sm mb-12">
          <p className="italic mb-6">
            "Flow AI's Unified Lead System transformed our internal processes at Reachflow. It eliminated inefficiencies, streamlined operations, and made everything run smoother. More importantly, their team is always there when you need them."
          </p>

          <div className="flex items-center justify-center">
            <div className="text-left">
              <h3 className="font-medium">Gabriel Martínez</h3>
              <p className="text-sm text-gray">Founder @ ReachFlow</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/book-call" className="btn-primary">
            See AI Close a Deal for You
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessOwnersSection;
