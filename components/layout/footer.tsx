import Image from "next/image"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import {
  FOOTER_CUSTOMER_CARE_LINKS,
  FOOTER_INFORMATION_LINKS,
  FOOTER_TRENDING_LINKS,
} from "@/constants"

const trendingLinks = FOOTER_TRENDING_LINKS
const informationLinks = FOOTER_INFORMATION_LINKS
const customerCareLinks = FOOTER_CUSTOMER_CARE_LINKS

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FaFacebookF },
  { label: "Twitter", href: "https://x.com", icon: FaTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
]

export function Footer() {
  return (
    <footer className="mt-8 bg-[#36393f] text-white lg:mt-10">
      <div className="mx-auto w-full max-w-11/12 px-4 py-10 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Image
              src="/logo.png"
              alt="Winstore"
              width={170}
              height={52}
              className="h-11 w-auto"
            />

            <p className="mt-4 text-[24px] leading-tight font-medium text-[#10c4d1]">
              Got questions? Call us 24/7!
            </p>
            <p className="mt-2 text-[16px] leading-tight text-[#efefef]">
              03 111 666 144
              <br />
              0317 1777015.
            </p>

            <p className="mt-5 text-[24px] leading-tight font-medium text-[#10c4d1]">
              Contact info
            </p>
            <p className="mt-1 text-[18px] leading-tight text-[#efefef]">info@winstore.pk</p>

            <div className="mt-4 flex items-center gap-5 text-[#f1f1f1]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white/80"
                >
                  <social.icon className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Trending" links={trendingLinks} />
          <FooterColumn title="Information" links={informationLinks} />

          <div>
            <h3 className="text-[24px] leading-tight font-medium text-[#10c4d1]">Customer Care</h3>
            <ul className="mt-4 space-y-2 text-[16px] leading-tight text-[#ececec]">
              {customerCareLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-start-3 lg:col-span-2 lg:-mt-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
              <PaymentBadgeImage
                src="/footer/visa.png"
                alt="Visa"
                width={160}
                height={72}
              />
              <PaymentBadgeImage
                src="/footer/mastercard.png"
                alt="MasterCard"
                width={160}
                height={72}
              />
              <PaymentBadgeImage
                src="/footer/cod.png"
                alt="Cash on Delivery"
                width={160}
                height={72}
              />
              <PaymentBadgeImage
                src="/footer/installment.png"
                alt="Easy Installment Plans"
                width={160}
                height={72}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#101117] py-4">
        <div className="mx-auto w-full max-w-11/12 px-4 lg:px-8">
          <p className="text-[16px] text-[#efefef]">© 2021 Winstore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-[24px] leading-tight font-medium text-[#10c4d1]">{title}</h3>
      <ul className="mt-4 space-y-2 text-[16px] leading-tight text-[#ececec]">
        {links.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function PaymentBadgeImage({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <div className="grid h-15 place-items-center rounded-md bg-white px-2 sm:h-16 sm:px-2.5 lg:h-14">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-10 w-auto object-contain sm:h-11 lg:h-9"
      />
    </div>
  )
}
