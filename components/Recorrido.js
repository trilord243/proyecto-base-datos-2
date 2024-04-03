

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Recorrido({ recorrido = [] }) {

    return (
        <nav aria-label="Progress">
            <h1 className="text-center font-bold mb-8">Recorrido de areas</h1>
            <ol role="list" className="flex items-center">
                {recorrido.map((step, stepIdx) => (
                    <li key={step.nodo} className={classNames(stepIdx !== recorrido.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                        {step.status === 'complete' ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-indigo-600" />
                                </div>
                                <a

                                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"
                                >
                                    <h3 className='text-black'>{step.nodo.charAt(step.nodo.length - 1)}</h3>

                                </a>
                            </>
                        ) : step.status === 'current' ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a

                                    className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                                    aria-current="step"
                                >
                                    <h3 className='text-black'>{step.nodo.charAt(step.nodo.length - 1)}</h3>


                                </a>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a

                                    className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                                >

                                    <h3 className='text-black'>{step.nodo.charAt(step.nodo.length - 1)}</h3>
                                </a>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
