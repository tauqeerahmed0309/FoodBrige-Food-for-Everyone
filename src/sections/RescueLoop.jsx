import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  Clipboard,
  Compass,
  FileText,
  Printer,
  Sparkles,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import Button from '../components/Button.jsx'
import {
  allocationMap,
  allDonations,
  COMMUNITY_NEEDS,
  findNeeds,
  impact,
  impactStory,
  JOURNEY,
  matchDonation,
  progressJourney,
  recordInterest,
  rescueClock,
  seedDemo,
  smartSplit,
  statusFor,
  updateDonation,
  validateAllocations
} from '../features/rescueLoop.js'

const formatDate = (val) => (val ? new Date(val).toLocaleString('en-IN') : 'Not recorded')

export default function RescueLoop({ onDonate }) {
  const [donations, setDonations] = useState(() => allDonations())
  const [selectedId, setSelectedId] = useState('')
  const [notice, setNotice] = useState('')
  const [needFilter, setNeedFilter] = useState('')
  const [manual, setManual] = useState({})
  const [storyOpen, setStoryOpen] = useState(false)

  const refresh = () => {
    const next = allDonations()
    setDonations(next)
    if (!selectedId && next[0]) {
      setSelectedId(next[0].id)
    }
  }

  useEffect(() => {
    refresh()
    window.addEventListener('foodbridge:updated', refresh)
    return () => window.removeEventListener('foodbridge:updated', refresh)
  }, [])

  const donation = donations.find((d) => d.id === selectedId) || donations[0]
  const matches = useMemo(() => (donation ? matchDonation(donation) : null), [donation])
  const metrics = impact(donations)
  const split = useMemo(() => (donation ? smartSplit(donation) : null), [donation])
  const currentAllocations = donation?.proposedAllocations?.length
    ? donation.proposedAllocations
    : split?.allocations || []

  const allocationCheck = donation
    ? validateAllocations(
        donation,
        Object.entries(manual).length
          ? Object.entries(manual).map(([id, servings]) => ({ id, servings: Number(servings) }))
          : currentAllocations
      )
    : null

  const canvasLimit = 120
  const canvasTotal = Math.min(Number(donation?.servings || 0), canvasLimit)
  const canvasGroups = allocationCheck?.valid ? allocationCheck.allocations : []
  const clock = donation ? rescueClock(donation) : null
  const visibleNeeds = findNeeds({ category: needFilter })

  const handleDemoSeed = () => {
    const d = seedDemo()
    setSelectedId(d.id)
    refresh()
    setNotice('Simulated judge scenario loaded. You can test live multi-hub allocation and journey tracking below.')
  }

  const handleSelectNgo = (ngo) => {
    try {
      recordInterest(donation, ngo)
      refresh()
      setNotice(`Demonstration interest recorded from ${ngo.name}. No real organisation was contacted.`)
    } catch (e) {
      setNotice(e.message)
    }
  }

  const handleAdvance = () => {
    try {
      progressJourney(donation)
      refresh()
      setNotice('Demonstration journey status advanced. Simulates the verified handover protocol.')
    } catch (e) {
      setNotice(e.message)
    }
  }

  const handleResetAllocation = () => {
    setManual(allocationMap(split?.allocations || []))
  }

  const handleConfirmAllocation = () => {
    if (!allocationCheck?.valid) {
      return setNotice(allocationCheck?.error || 'Allocation requires review.')
    }
    try {
      updateDonation(donation.id, (d) => ({
        ...d,
        proposedAllocations: allocationCheck.allocations,
        allocationConfirmedAt: new Date().toISOString()
      }))
      refresh()
      setManual({})
      setNotice('Proposed allocation saved locally in your browser storage.')
    } catch {
      setNotice('Unable to save allocation on this device.')
    }
  }

  const handlePrint = () => window.print()

  const handleCopyReference = () => {
    navigator.clipboard?.writeText(donation.id)
    setNotice(`Reference ID FB-${donation.id.slice(-8).toUpperCase()} copied to clipboard.`)
  }

  return (
    <section id="rescue-loop" className="py-24 md:py-32 bg-[#123B2A] text-[#F5F2E9] border-t border-[#365B46]">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#365B46] pb-4 mb-12">
          <p className="label-tag text-[#C5D2C7]">
            <span className="label-index font-mono text-[#B7D66B]">05</span>
            <span>Rescue Studio &middot; Interactive Allocation Engine</span>
          </p>
          <span className="text-xs font-mono text-[#C5D2C7] uppercase tracking-wider">
            Browser-Local Prototype
          </span>
        </div>

        {/* Title & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <h2 className="h2 text-[#F5F2E9] tracking-tight">
              A meal should never be lost{' '}
              <span className="marker text-[#B7D66B]">between kitchen and community.</span>
            </h2>
            <p className="lead mt-4 text-[#C5D2C7]">
              Explore the deterministic rescue engine: automated community need matching,
              customizable multi-hub splitting, and timestamped passport tracking.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" onClick={handleDemoSeed} icon={Sparkles}>
              Experience Rescue Demo
            </Button>
            <button
              onClick={onDonate}
              className="inline-flex items-center gap-2 rounded-lg border border-[#365B46] px-5 py-2.5 text-sm font-semibold text-[#F5F2E9] hover:bg-[#194B35] transition-colors"
            >
              <span>Create New Listing</span>
              <span className="text-[#B7D66B]">+</span>
            </button>
          </div>
        </div>

        {/* Toast Notice */}
        <AnimatePresence>
          {notice && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-4 rounded-xl bg-[#194B35] border border-[#B7D66B]/60 flex items-center justify-between text-sm text-[#F5F2E9]"
              role="status"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#B7D66B] text-[#111411] text-xs font-mono font-bold">
                  i
                </span>
                <span>{notice}</span>
              </div>
              <button
                onClick={() => setNotice('')}
                className="text-xs font-mono uppercase underline text-[#C5D2C7] hover:text-[#F5F2E9]"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Part A: Community Need Radar */}
        <div className="p-8 rounded-2xl border border-[#365B46] bg-[#194B35] mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#365B46]">
            <div>
              <p className="label-tag text-[#B7D66B]">Community Radar &middot; Sample Data</p>
              <h3 className="h3 mt-2 text-[#F5F2E9]">Needs from local shelters &amp; collectives</h3>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="need-filter" className="text-xs font-mono uppercase tracking-wider text-[#C5D2C7]">
                Filter category:
              </label>
              <select
                id="need-filter"
                value={needFilter}
                onChange={(e) => setNeedFilter(e.target.value)}
                className="rounded-lg border border-[#365B46] bg-[#123B2A] px-3 py-2 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B7D66B]"
              >
                <option value="">All Categories</option>
                <option value="Cooked meals">Cooked meals</option>
                <option value="Fresh produce">Fresh produce</option>
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visibleNeeds.map((need) => (
              <article
                key={need.id}
                className="p-6 rounded-xl border border-[#365B46] bg-[#123B2A] hover:border-[#B7D66B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#365B46]/60">
                    <span className="label-tag text-[#B7D66B] bg-[#B7D66B]/15 px-2.5 py-1 rounded">
                      {need.priority} Priority
                    </span>
                    <span className="font-mono text-xs text-[#C5D2C7]">{need.window}</span>
                  </div>
                  <h4 className="font-display text-2xl font-normal text-[#F5F2E9] mt-4">
                    {need.category} &middot; {need.required} Servings
                  </h4>
                  <p className="text-xs text-[#B7D66B] font-medium mt-1 flex items-center gap-1">
                    <MapPin size={13} /> {need.location}
                  </p>
                  <p className="mt-3 text-xs text-[#C5D2C7] leading-relaxed">
                    {need.requirements}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#365B46]/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#C5D2C7]">Capacity: {need.capacity} max</span>
                  <button
                    onClick={() => {
                      setNeedFilter(need.category)
                      setNotice(`Plan filtered for ${need.category}. Use the demo scenario or create a donation below.`)
                    }}
                    className="text-xs font-semibold text-[#B7D66B] hover:text-[#F5F2E9] underline transition-colors"
                  >
                    Plan donation for this need &rarr;
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part B: Rescue Studio Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Listing Inspector & Smart Split */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 rounded-2xl border border-[#365B46] bg-[#194B35]">
              <div className="flex items-center justify-between pb-6 border-b border-[#365B46]">
                <div>
                  <p className="label-tag text-[#B7D66B]">Rescue Studio &middot; Matching Console</p>
                  <h3 className="h3 mt-2 text-[#F5F2E9]">Compatible local partners</h3>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[#365B46] bg-[#123B2A] text-[#B7D66B]">
                  <Compass size={24} />
                </div>
              </div>

              {donations.length ? (
                <>
                  <div className="mt-6">
                    <label htmlFor="listing-select" className="block text-xs font-mono uppercase tracking-wider text-[#C5D2C7] mb-2">
                      Select Listing to Inspect:
                    </label>
                    <select
                      id="listing-select"
                      value={donation?.id || ''}
                      onChange={(e) => {
                        setSelectedId(e.target.value)
                        setManual({})
                      }}
                      className="w-full rounded-lg border border-[#365B46] bg-[#123B2A] p-3 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B7D66B]"
                    >
                      {donations.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.demo ? 'Scenario Demo · ' : ''}
                          {d.category} — {d.quantity} ({d.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  {clock && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#B7D66B] bg-[#B7D66B]/10 border border-[#B7D66B]/30 px-3 py-2 rounded-lg">
                      <Clock size={14} />
                      <span>
                        Rescue Clock: <strong>{clock.label}</strong>
                        {clock.ms ? ` · ~${Math.ceil(clock.ms / 3600000)}h remaining for collection` : ''}
                      </span>
                    </div>
                  )}

                  {/* Route Card */}
                  <div className="mt-6 p-6 rounded-xl border border-[#365B46] bg-[#123B2A]">
                    <div className="flex items-start justify-between pb-4 border-b border-[#365B46]">
                      <div>
                        <p className="label-tag text-[#C5D2C7]">Donation Node</p>
                        <h4 className="font-display text-2xl font-normal text-[#F5F2E9] mt-1">
                          {donation.category}
                        </h4>
                        <p className="text-xs text-[#C5D2C7] mt-1 font-mono">
                          {donation.quantity} &middot; {donation.servings || '—'} estimated servings
                        </p>
                      </div>
                      <span className="font-mono text-xs bg-[#B7D66B]/20 text-[#B7D66B] font-semibold px-2.5 py-1 rounded">
                        {statusFor(donation)}
                      </span>
                    </div>

                    <div className="mt-4 text-xs font-mono text-[#C5D2C7] space-y-1">
                      <p>Location: {donation.location}</p>
                      <p>Safe Deadline: {formatDate(donation.deadline)}</p>
                      <p>Storage Condition: {donation.storageCondition || 'Not recorded'}</p>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-6 pt-5 border-t border-[#365B46]">
                      <p className="label-tag text-[#B7D66B] mb-3">Deterministic Partner Recommendations</p>
                      {matches?.review || !matches?.results?.length ? (
                        <div className="p-4 rounded-lg bg-[#194B35] border border-[#365B46] text-xs text-[#C5D2C7] flex items-center gap-2">
                          <AlertCircle size={16} className="text-[#B7D66B] shrink-0" />
                          <span>{matches?.message || 'No single NGO match meets full capacity. Review Smart Split below to allocate across local community needs.'}</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {matches?.results.map((ngo) => (
                            <div
                              key={ngo.id}
                              className="p-4 rounded-lg border border-[#365B46] bg-[#194B35] hover:border-[#B7D66B] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-display font-normal text-[#F5F2E9] text-lg">
                                    {ngo.name}
                                  </h5>
                                  <span className="text-xs font-mono text-[#B7D66B] font-bold">
                                    {ngo.score}/100 match
                                  </span>
                                </div>
                                <p className="text-xs text-[#C5D2C7] mt-1">{ngo.explanation}</p>
                              </div>
                              <button
                                onClick={() => handleSelectNgo(ngo)}
                                className="shrink-0 text-xs font-semibold px-3 py-2 rounded border border-[#365B46] bg-[#123B2A] text-[#F5F2E9] hover:bg-[#B7D66B] hover:text-[#111411] transition-colors"
                              >
                                Record Demo Interest &rarr;
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Smart Split Rescue */}
                  <div className="mt-8 pt-6 border-t border-[#365B46]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="label-tag text-[#B7D66B]">Smart Split &middot; Multi-Hub Allocation</p>
                      <button
                        onClick={handleResetAllocation}
                        className="text-xs font-mono text-[#B7D66B] hover:underline"
                      >
                        Reset recommendations
                      </button>
                    </div>

                    <div className="space-y-3">
                      {split?.allocations.map((a) => (
                        <div
                          key={a.id}
                          className="p-3.5 rounded-lg border border-[#365B46] bg-[#123B2A] flex items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <span className="font-semibold text-[#F5F2E9]">{a.id}</span>
                            <span className="text-[#C5D2C7] ml-2 font-mono">
                              (Max capacity: {a.capacity})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <label htmlFor={`alloc-${a.id}`} className="font-mono text-[#C5D2C7]">
                              Servings:
                            </label>
                            <input
                              id={`alloc-${a.id}`}
                              type="number"
                              min="0"
                              max={a.capacity}
                              step="1"
                              value={
                                manual[a.id] ??
                                currentAllocations.find((x) => x.id === a.id)?.servings ??
                                0
                              }
                              onChange={(e) =>
                                setManual((m) => ({ ...m, [a.id]: e.target.value }))
                              }
                              className="w-20 rounded border border-[#365B46] bg-[#194B35] p-1.5 font-mono text-right text-[#F5F2E9] focus:outline-none focus:border-[#B7D66B]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono pt-3 border-t border-[#365B46]">
                      <span className="text-[#C5D2C7]">
                        Unallocated:{' '}
                        <strong className="text-[#F5F2E9]">
                          {allocationCheck?.valid ? allocationCheck.unallocated : '—'} servings
                        </strong>
                      </span>
                      <Button
                        variant="primary"
                        onClick={handleConfirmAllocation}
                        className="!min-h-[38px] !py-1.5 !text-xs"
                      >
                        Confirm Proposed Split
                      </Button>
                    </div>

                    {!allocationCheck?.valid && (
                      <p className="mt-2 text-xs text-rose-400 font-mono">
                        {allocationCheck?.error}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-[#C5D2C7] text-sm font-mono">
                    No active listings recorded in this browser.
                  </p>
                  <Button variant="primary" onClick={handleDemoSeed} className="mt-4">
                    Load Demonstration Scenario
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Rescue Journey */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl border border-[#365B46] bg-[#194B35]">
              <div className="flex items-center justify-between pb-6 border-b border-[#365B46]">
                <div>
                  <p className="label-tag text-[#B7D66B]">Rescue Journey</p>
                  <h3 className="h3 mt-2 text-[#F5F2E9]">Chain of Custody Protocol</h3>
                </div>
                <ShieldCheck size={24} className="text-[#B7D66B]" />
              </div>

              {donation ? (
                <>
                  <ol className="mt-8 space-y-6">
                    {JOURNEY.map((step, index) => {
                      const isCompleted = JOURNEY.indexOf(statusFor(donation)) >= index
                      const event = donation.journeyEvents?.find((e) => e.status === step)

                      return (
                        <li key={step} className="flex gap-4 items-start">
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs font-bold transition-colors ${
                              isCompleted
                                ? 'bg-[#B7D66B] text-[#111411]'
                                : 'border border-[#365B46] text-[#C5D2C7] bg-[#123B2A]'
                            }`}
                          >
                            {isCompleted ? <Check size={14} strokeWidth={2.5} /> : index + 1}
                          </span>
                          <div className="flex-1 pb-4 border-b border-[#365B46]/60">
                            <p
                              className={`text-sm font-semibold ${
                                isCompleted ? 'text-[#F5F2E9]' : 'text-[#C5D2C7]'
                              }`}
                            >
                              {step}
                            </p>
                            {event ? (
                              <p className="text-[11px] font-mono text-[#B7D66B] mt-1">
                                Simulated timestamp &middot; {formatDate(event.at)}
                              </p>
                            ) : (
                              <p className="text-[11px] font-mono text-[#C5D2C7]/70 mt-1">
                                Pending dispatch coordination
                              </p>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ol>

                  <div className="mt-8 pt-4 border-t border-[#365B46]">
                    <Button
                      variant="ghost"
                      onClick={handleAdvance}
                      disabled={statusFor(donation) === 'Distribution Completed'}
                      className="w-full justify-center text-xs border-[#365B46] text-[#F5F2E9] hover:bg-[#123B2A]"
                    >
                      Advance Demo Journey &rarr;
                    </Button>
                  </div>
                </>
              ) : (
                <p className="py-8 text-xs text-[#C5D2C7] text-center font-mono">
                  Select a listing on the left to track its journey.
                </p>
              )}
            </div>

            {/* Impact Story Generator */}
            {donation && (
              <div className="p-8 rounded-2xl border border-[#365B46] bg-[#194B35]">
                <div className="flex items-center justify-between pb-4 border-b border-[#365B46]">
                  <p className="label-tag text-[#B7D66B]">Editorial Impact Story</p>
                  <FileText size={20} className="text-[#C5D2C7]" />
                </div>
                <p className="text-xs text-[#C5D2C7] mt-3 leading-relaxed">
                  Generate an honest, transparent summary of this prototype plan suitable for print or distribution records.
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setStoryOpen(!storyOpen)}
                    className="text-xs font-semibold px-4 py-2.5 rounded-lg border border-[#365B46] bg-[#123B2A] hover:border-[#B7D66B] transition-colors text-[#F5F2E9]"
                  >
                    {storyOpen ? 'Hide story preview' : 'Preview impact story'}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        impactStory(donation, allocationCheck?.allocations || [])
                      )
                      setNotice('Impact story copied to clipboard.')
                    }}
                    className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-[#F5F2E9] text-[#123B2A] hover:bg-[#FFFFFF] transition-colors shadow-sm"
                  >
                    Copy summary
                  </button>
                </div>

                {storyOpen && (
                  <div className="mt-5 pt-4 border-t border-[#365B46] text-xs font-mono text-[#C5D2C7] bg-[#123B2A] p-4 rounded-xl border border-[#365B46] whitespace-pre-wrap leading-relaxed">
                    {impactStory(donation, allocationCheck?.allocations || [])}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Part C: Rescue Passport */}
        {donation && (
          <div className="mt-14 p-8 sm:p-10 rounded-2xl border border-[#365B46] bg-[#194B35]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#365B46]">
              <div>
                <p className="label-tag text-[#B7D66B]">Rescue Passport &middot; Handover Receipt</p>
                <h3 className="h3 mt-1 text-[#F5F2E9]">
                  FB-{donation.id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-xs text-[#C5D2C7] mt-1 font-mono">
                  Prototype proof of local coordination. Not a commercial health certificate.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#365B46] bg-[#123B2A] px-3.5 py-2 text-xs font-semibold text-[#F5F2E9] hover:border-[#B7D66B] transition-colors"
                >
                  <Clipboard size={14} />
                  <span>Copy ID</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#365B46] bg-[#123B2A] px-3.5 py-2 text-xs font-semibold text-[#F5F2E9] hover:border-[#B7D66B] transition-colors"
                >
                  <Printer size={14} />
                  <span>Print Passport</span>
                </button>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-[#123B2A] border border-[#365B46]">
                <span className="text-[#C5D2C7] font-mono uppercase tracking-wider block">Food Category</span>
                <strong className="text-lg font-display text-[#F5F2E9] mt-1 block font-normal">
                  {donation.category}
                </strong>
                <span className="text-[#C5D2C7] mt-1 block font-mono">{donation.quantity}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#123B2A] border border-[#365B46]">
                <span className="text-[#C5D2C7] font-mono uppercase tracking-wider block">Collection Area</span>
                <strong className="text-lg font-display text-[#F5F2E9] mt-1 block font-normal">
                  {donation.location}
                </strong>
                <span className="text-[#C5D2C7] mt-1 block font-mono">Bangalore Urban Grid</span>
              </div>
              <div className="p-4 rounded-xl bg-[#123B2A] border border-[#365B46]">
                <span className="text-[#C5D2C7] font-mono uppercase tracking-wider block">Thermal Storage</span>
                <strong className="text-lg font-display text-[#F5F2E9] mt-1 block font-normal">
                  {donation.storageCondition || 'Not recorded'}
                </strong>
                <span className="text-[#C5D2C7] mt-1 block font-mono">
                  {donation.storageTemperature ? `${donation.storageTemperature}°C` : 'Compliant'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#123B2A] border border-[#365B46]">
                <span className="text-[#C5D2C7] font-mono uppercase tracking-wider block">Journey Status</span>
                <strong className="text-lg font-display text-[#B7D66B] mt-1 block font-normal">
                  {statusFor(donation)}
                </strong>
                <span className="text-[#C5D2C7] mt-1 block font-mono">Local Registry</span>
              </div>
            </div>

            {/* Impact Canvas */}
            <div className="mt-10 pt-8 border-t border-[#365B46]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="label-tag text-[#B7D66B]">Impact Canvas &middot; Portion Grid</p>
                  <h4 className="font-display text-2xl font-normal text-[#F5F2E9] mt-1">
                    Visualisation of every potential serving
                  </h4>
                </div>
                <span className="font-mono text-xs text-[#C5D2C7]">
                  {canvasTotal} serving units shown
                </span>
              </div>

              <div
                className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-1.5 p-4 rounded-xl bg-[#123B2A] border border-[#365B46]"
                aria-label={`${canvasTotal} potential meal units`}
              >
                {Array.from({ length: canvasTotal }, (_, index) => {
                  let cursor = 0
                  const group = canvasGroups.find((a) => {
                    cursor += a.servings
                    return index < cursor
                  })
                  const colors = ['bg-[#B7D66B]', 'bg-[#F5F2E9]', 'bg-[#365B46]']
                  const colorIndex = group ? canvasGroups.indexOf(group) % colors.length : -1

                  return (
                    <span
                      key={index}
                      title={group ? `${group.id}: ${group.servings} portions` : 'Unallocated'}
                      className={`h-4 rounded-full border border-[#365B46] transition-all ${
                        group ? colors[colorIndex] : 'bg-[#194B35] opacity-40'
                      }`}
                    />
                  )
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#C5D2C7]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#194B35] border border-[#365B46]" />
                  Unallocated ({allocationCheck?.valid ? allocationCheck.unallocated : 0})
                </span>
                {canvasGroups.map((g, i) => (
                  <span key={g.id} className="inline-flex items-center gap-1.5">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        ['bg-[#B7D66B]', 'bg-[#F5F2E9]', 'bg-[#365B46]'][i % 3]
                      }`}
                    />
                    {g.id}: {g.servings} portions
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Part D: Civic Ripple Metrics */}
        <div className="mt-16 pt-10 border-t border-[#365B46]">
          <p className="label-tag text-[#C5D2C7] mb-6">Cumulative Civic Ripple &middot; Local Registry</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-4 rounded-xl border border-[#365B46] bg-[#194B35]">
              <span className="font-display text-4xl sm:text-5xl text-[#F5F2E9] font-normal">
                {metrics.listed}
              </span>
              <p className="text-xs font-mono text-[#C5D2C7] mt-1">Donations Cataloged</p>
            </div>
            <div className="p-4 rounded-xl border border-[#365B46] bg-[#194B35]">
              <span className="font-display text-4xl sm:text-5xl text-[#B7D66B] font-normal">
                {metrics.servings}
              </span>
              <p className="text-xs font-mono text-[#C5D2C7] mt-1">Estimated Servings</p>
            </div>
            <div className="p-4 rounded-xl border border-[#365B46] bg-[#194B35]">
              <span className="font-display text-4xl sm:text-5xl text-[#F5F2E9] font-normal">
                {metrics.available}
              </span>
              <p className="text-xs font-mono text-[#C5D2C7] mt-1">Currently Available</p>
            </div>
            <div className="p-4 rounded-xl border border-[#365B46] bg-[#194B35]">
              <span className="font-display text-4xl sm:text-5xl text-[#B7D66B] font-normal">
                {metrics.interests}
              </span>
              <p className="text-xs font-mono text-[#C5D2C7] mt-1">NGO Interests</p>
            </div>
            <div className="p-4 rounded-xl border border-[#365B46] bg-[#194B35] col-span-2 sm:col-span-1">
              <span className="font-display text-4xl sm:text-5xl text-[#F5F2E9] font-normal">
                {metrics.completed}
              </span>
              <p className="text-xs font-mono text-[#C5D2C7] mt-1">Journeys Completed</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-mono text-[#C5D2C7]/70">
            * Browser-local demonstration records. No central cloud telemetry.
          </p>
        </div>
      </div>
    </section>
  )
}
