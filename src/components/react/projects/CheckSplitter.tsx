import Subheading from '../Subheading'
import Input from '../Input'
import Button from '../Button'
import { Eraser, UserPlus2, X } from 'lucide-react'
import * as math from 'mathjs'
import { useEffect, useState } from 'react'

interface Share {
  total: string
  breakdown: string
}

export default function CheckSplitter() {
  const [indSubtotalInput, setIndSubtotalInput] = useState('')
  const [indExprErrorMsg, setIndExprErrorMsg] = useState('')
  const [subtotalInput, setSubtotalInput] = useState('')
  const [taxTipInput, setTaxTipInput] = useState('')
  const [taxTipExprErrorMsg, setTaxTipExprErrorMsg] = useState('')

  const [subtotalShare, setSubtotalShare] = useState('0.00')
  const [taxTipShare, setTaxTipShare] = useState('0.00')
  const [totalShare, setTotalShare] = useState('0.00')

  const [shares, setShares] = useState<Share[]>([])

  function parseInput(input: string) {
    if (!math.hasNumericValue(input)) {
      return false
    }

    return math.round(math.number(input), 2)
  }

  function clearInputs() {
    setIndSubtotalInput('')
    setSubtotalInput('')
    setTaxTipInput('')
  }

  function trackShare() {
    setShares([
      ...shares,
      {
        total: totalShare,
        breakdown: `$${subtotalShare} + $${taxTipShare}`,
      },
    ])
  }

  function untrackShare(index: number) {
    setShares(shares.toSpliced(index, 1))
  }

  useEffect(() => {
    let subtotal = parseInput(subtotalInput) || 1

    // Calculate individual's subtotal
    let indSubtotal: number
    try {
      indSubtotal = math.evaluate(indSubtotalInput) || 0
      setIndExprErrorMsg('')
    } catch (error) {
      setIndExprErrorMsg('❗ Invalid arithmetic expression!')
      return
    }

    // Calculate tax + tip
    let taxTip: number
    try {
      taxTip = math.evaluate(taxTipInput) || 0
      setTaxTipExprErrorMsg('')
    } catch (error) {
      setTaxTipExprErrorMsg('❗ Invalid arithmetic expression!')
      return
    }

    const taxTipShareVal = (indSubtotal / subtotal) * taxTip
    const totalShare = taxTipShareVal + indSubtotal

    setSubtotalShare(indSubtotal.toFixed(2))
    setTaxTipShare(taxTipShareVal.toFixed(2))
    setTotalShare(totalShare.toFixed(2))
  }, [indSubtotalInput, subtotalInput, taxTipInput])

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
          Check Tax + Tip ($) - accepts math expr.
          <Input
            type="text"
            value={taxTipInput}
            onChange={(e) => setTaxTipInput(e.target.value)}
            placeholder="0.00"
          />
          <span className="mt-1 text-red-500">{taxTipExprErrorMsg}</span>
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
      <Subheading className="mb-2 mt-5">Share table</Subheading>
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
              Breakdown
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
              </td>
              <td className="border-b border-slate-600 p-2 md:p-4">
                {share.breakdown}
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
        <b>Sum of shares:</b> $
        {math.sum(shares.map((share) => math.number(share.total))).toFixed(2)}
      </details>
    </>
  )
}
