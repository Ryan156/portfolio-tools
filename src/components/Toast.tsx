type ToastProps = {
  toasts: string[]
}

function Toast({ toasts }: ToastProps) {
  return (
    <div className="toast-stack">
      {[...toasts].reverse().map((toast) => (
        <div key={toast} className="copy-toast">
          ✓ Copied to clipboard!
        </div>
      ))}
    </div>
  )
}

export default Toast