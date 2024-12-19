import './ItemCount.css'

function ItemCount({amount,stock,onIncrement,onDecrement,clase}) {
  return (
    <div className={clase}>
    <button onClick={onDecrement} disabled={amount<=1}>-</button>
    <span>{amount}</span>
    <button onClick={onIncrement} disabled={amount>=stock}>+</button>
</div>
  )
}

export default ItemCount