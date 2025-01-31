import Subheading from '../Subheading'
import Input from '../Input'
import Button from '../Button'
import domtoimage from 'dom-to-image'
import { Eraser, Image, UserPlus2, X } from 'lucide-react'
import * as math from 'mathjs'
import { useEffect, useRef, useState } from 'react'

interface Share {
  subtotal: string
  taxTip: string
  total: string
  breakdown: string
  indSubtotalInput: string
}

const GENERATED_IMAGE_SCALE = 3

export default function CheckSplitter() {
  const [indSubtotalInput, setIndSubtotalInput] = useState('')
  const [indExprErrorMsg, setIndExprErrorMsg] = useState('')
  const [subtotalInput, setSubtotalInput] = useState('')
  const [totalInput, setTotalInput] = useState('')

  const [subtotalShare, setSubtotalShare] = useState('0.00')
  const [taxTipShare, setTaxTipShare] = useState('0.00')
  const [totalShare, setTotalShare] = useState('0.00')

  const [shares, setShares] = useState<Share[]>([])

  let calcSubtotal = math.sum(
    shares.map((share) => math.number(share.subtotal))
  )
  let calcTaxTip = math.sum(shares.map((share) => math.number(share.taxTip)))
  let calcTotal = math.sum(shares.map((share) => math.number(share.total)))

  const shareTableRef = useRef<HTMLDivElement>(null)
  const shareTableImgRef = useRef<HTMLImageElement>(null)
  const [imgGenerated, setImgGenerated] = useState(false)

  function parseInput(input: string) {
    if (!math.hasNumericValue(input)) {
      return false
    }

    return math.round(math.number(input), 2)
  }

  function clearInputs() {
    setIndSubtotalInput('')
    setSubtotalInput('')
  }

  function trackShare() {
    setShares([
      ...shares,
      {
        subtotal: subtotalShare,
        taxTip: taxTipShare,
        total: totalShare,
        breakdown: `$${subtotalShare} + $${taxTipShare}`,
        indSubtotalInput: `${indSubtotalInput}`,
      },
    ])
  }

  function untrackShare(index: number) {
    setShares(shares.toSpliced(index, 1))
  }

  function handleExportImage() {
    const table = shareTableRef.current
    if (!table) return

    const style = {
      transform: `scale(${GENERATED_IMAGE_SCALE})`,
      transformOrigin: 'top left',
      width: table.offsetWidth + 'px',
      height: table.offsetHeight + 'px',
    }

    const options = {
      height: table.offsetHeight * GENERATED_IMAGE_SCALE,
      width: table.offsetWidth * GENERATED_IMAGE_SCALE,
      quality: 1,
      style,
    }

    domtoimage.toPng(table, options).then((url: string) => {
      if (shareTableImgRef.current) shareTableImgRef.current.src = url
      setImgGenerated(true)
    })
  }

  useEffect(() => {
    let subtotal = parseInput(subtotalInput) || 1
    let total = parseInput(totalInput) || 1

    // Calculate individual's subtotal
    let indSubtotal: number
    try {
      indSubtotal = math.evaluate(indSubtotalInput) || 0
      setIndExprErrorMsg('')
    } catch (error) {
      setIndExprErrorMsg('❗ Invalid arithmetic expression!')
      return
    }

    const totalShare = (indSubtotal / subtotal) * total
    const taxTipShareVal = +totalShare.toFixed(2) - indSubtotal

    setSubtotalShare(indSubtotal.toFixed(2))
    setTaxTipShare(taxTipShareVal.toFixed(2))
    setTotalShare(totalShare.toFixed(2))
  }, [indSubtotalInput, subtotalInput, totalInput])

  return (
    <>
      <form>
        <label className="mb-3 block">
          Individual Subtotal ($) - accepts math expressions
          <Input
            type="text"
            value={indSubtotalInput}
            onChange={(e) => setIndSubtotalInput(e.target.value)}
            placeholder="ex: 1.00 + 1.50*3"
          />
          <span className="mt-1 text-red-500">{indExprErrorMsg}</span>
        </label>

        <label className="my-3 block">
          Check Subtotal ($)
          <Input
            type="number"
            value={subtotalInput}
            onChange={(e) => setSubtotalInput(e.target.value)}
            placeholder="0.00"
            step=".01"
            min="0"
          />
        </label>

        <label className="my-3 block">
          Check Total ($)
          <Input
            type="number"
            value={totalInput}
            onChange={(e) => setTotalInput(e.target.value)}
            placeholder="0.00"
            step=".01"
            min="0"
          />
          {subtotalInput && totalInput && (
            <span className="mt-1 text-sm text-gray-200">
              - Calculated tax/tip: $
              {(
                (parseInput(totalInput) || 1) - (parseInput(subtotalInput) || 1)
              ).toFixed(2)}
            </span>
          )}
        </label>

        <div>
          <Subheading className="mt-5">Result</Subheading>
          <span className="me-2">Individual's Total Share:</span>${totalShare}
          <br />
          <i className="me-2">Breakdown (subtotal + tax/tip):</i>
          <span>
            ${subtotalShare} + ${taxTipShare}
          </span>
        </div>
      </form>
      <Button
        onClick={clearInputs}
        className="me-4 mt-3 bg-purple-600 font-bold hover:bg-purple-700"
        type="button"
      >
        <Eraser className="me-1 inline w-5 align-top" />
        Clear inputs
      </Button>
      <Button
        onClick={trackShare}
        className="mt-3 bg-green-600 font-bold hover:bg-green-700"
        type="button"
      >
        <UserPlus2 className="me-1 inline align-top" />
        Track in table
      </Button>
      <hr className="my-4" />
      {/* Share table */}
      <div ref={shareTableRef} className="relative bg-primary px-1">
        <Subheading className="mb-2 mt-0">Share table</Subheading>
        <input
          type="text"
          placeholder="Enter table description"
          className="w-96 border-0 bg-primary p-0 text-sm text-white placeholder:text-slate-400 focus:ring-blue-200 md:w-96 md:text-base"
        />

        <table className="mb-3 w-full table-auto border-collapse text-sm md:text-base">
          <thead className="bg-slate-800">
            <tr>
              <th className="border-b border-slate-500 px-2 py-3 text-left md:px-4">
                Name
              </th>
              <th className="border-b border-slate-500 px-2 py-3 text-left md:px-4">
                Share
              </th>
              <th className="border-b border-slate-500 px-2 py-3 text-left italic md:px-4">
                Breakdown (Subtotal + Tax/Tip)
              </th>
              <th className="border-b border-slate-500"></th>
            </tr>
          </thead>
          <tbody>
            {shares.map((share, index) => (
              <tr key={index}>
                <td className="border-b border-slate-600 p-2 md:p-4">
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-24 border-0 bg-primary p-0 text-sm text-white placeholder:text-slate-400 focus:ring-blue-200 md:w-48 md:text-base"
                  />
                </td>
                <td className="border-b border-slate-600 p-2 md:p-4">
                  ${share.total}
                  <br />
                  <small>
                    (
                    {((parseFloat(share.total) * 100) / calcTotal || 0).toFixed(
                      1
                    )}
                    % of total)
                  </small>
                </td>
                <td className="border-b border-slate-600 p-2 md:p-4">
                  {share.breakdown}
                  <br />
                  <small>
                    Subtotal Share Calculation: {share.indSubtotalInput}
                  </small>
                </td>
                <td className="border-b border-slate-600 pe-2">
                  <div className="flex justify-end">
                    <button
                      onClick={() => untrackShare(shares.indexOf(share))}
                      tabIndex={-1}
                    >
                      <X className="text-red-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <details open={true}>
          <summary className="border-b border-blue-100 font-bold">
            Details
          </summary>
          <b>Calculated total:</b> ${calcTotal.toFixed(2)}
          <br />
          <b>Calculated subtotal:</b> ${calcSubtotal.toFixed(2)}
          <br />
          <b>Calculated tax/tip:</b> ${calcTaxTip.toFixed(2)}
        </details>

        <div className="absolute bottom-0 right-1 text-gray-300">
          adoryvo.com/split
        </div>
      </div>

      <Button
        className="mt-5 bg-teal-500 font-bold transition-opacity disabled:opacity-75"
        disabled={shares.length == 0}
        onClick={handleExportImage}
      >
        <Image className="me-1 inline align-top" /> Generate table as image
      </Button>
      <span className={`ml-5 ${!imgGenerated ? 'hidden' : ''}`}>
        Your table image has been generated below!
      </span>

      <figure
        className={`mt-5 border-4 border-gray-300 ${!imgGenerated ? 'hidden' : ''}`}
      >
        <img ref={shareTableImgRef} src="" alt="" />
        <figcaption className="bg-dark text-center italic">
          Table image above, right-click or long-press to save or share!
        </figcaption>
      </figure>
    </>
  )
}
