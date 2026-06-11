import Breadcrumb from "../../components/Breadcrumb";
import bg1 from "../../assets/1bg.webp";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#fdf8f0] overflow-hidden py-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${bg1})` }}
        />

        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-serif text-gray-900"
          >
            Refund Policy
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-[2px] bg-[#B8860B] mt-4 mb-5"
          />

          <p className="text-[#B8860B] font-medium text-md mb-4">
            Transparent and Fair Payment Practices
          </p>

          <p className="max-w-3xl text-gray-600 text-[13px] leading-7">
            This Refund Policy outlines the conditions under which MRI Xplore
            may provide refunds for memberships, event registrations,
            publication-related services, subscriptions, and other services.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              {
                label: "Refund Policy",
                path: "/refund-policy",
              },
            ]}
          />
        </div>
      </div>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Last Updated */}
          <div className="mb-10">
            <span className="inline-flex rounded-full border border-[#B8860B]/20 bg-[#fdf8f0] px-4 py-2 text-sm font-medium text-[#B8860B]">
              Last Updated: June 2026
            </span>
          </div>

          {/* Notice */}
          <div className="mb-12 rounded-xl border border-[#eadfc6] bg-[#fdf8f0] p-6">
            <div className="flex gap-3">
              <AlertCircle
                size={20}
                className="text-[#B8860B] mt-1 flex-shrink-0"
              />

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Important Notice
                </h2>

                <p className="text-sm text-gray-600 leading-7">
                  Please carefully review service descriptions, registration
                  details, and applicable terms before making any payment.
                  Completion of a payment constitutes acceptance of this Refund
                  Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                General Refund Policy
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                MRI Xplore aims to maintain transparent and fair payment
                practices. Refund requests are reviewed based on the type of
                service purchased, the timing of the request, and the status of
                service delivery.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Membership Fees
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                Membership fees paid for professional, student, institutional,
                or organizational memberships are generally non-refundable
                unless specifically stated otherwise.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Conferences, Workshops and Events
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                Refund requests for conferences, seminars, workshops, training
                programs, and related events may be considered only if submitted
                before the published cancellation deadline.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Publication and Editorial Services
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                Article processing charges, publication fees, editorial review
                fees, DOI registration charges, indexing support fees, and
                related scholarly publishing services are non-refundable once
                the review or publication process has commenced.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Digital Products and Subscriptions
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                Payments for digital resources, online subscriptions,
                downloadable materials, reports, certificates, and electronic
                services are generally non-refundable once access has been
                granted.
              </p>
            </div>

            {/* Non Refundable Box */}
            <div className="rounded-xl border border-red-100 bg-red-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Non-Refundable Services
              </h2>

              <ul className="space-y-3 text-[15px] text-gray-600">
                <li>• Published articles and research outputs</li>
                <li>• Editorial and peer-review services</li>
                <li>• DOI registration and indexing services</li>
                <li>• Completed workshops and training programs</li>
                <li>• Downloaded digital resources and reports</li>
                <li>• Expired subscription periods</li>
                <li>• Services explicitly marked as non-refundable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Duplicate Payments and Technical Errors
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                Refunds may be issued in cases of verified duplicate payments,
                payment gateway failures, or technical transaction errors after
                successful verification by MRI Xplore.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Refund Processing Time
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                Approved refunds are processed through the original payment
                method. Processing times may vary depending on payment
                providers, banks, and financial institutions.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Changes to This Policy
              </h2>

              <p className="text-[15px] text-gray-600 leading-8">
                MRI Xplore reserves the right to modify or update this Refund
                Policy at any time. Updated versions will be posted on this
                page.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-14 rounded-xl bg-gray-50 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>

            <p className="text-[15px] text-gray-600 leading-8">
              For refund-related questions, please contact the MRI Xplore
              support team with your payment reference number and supporting
              documentation for review.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}