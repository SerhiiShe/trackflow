import { useClients } from '../hooks/useClients'
import type { Client } from '../types'

interface ClientListProps {
  onEditClick: (client: Client) => void
  viewMode: 'grid' | 'list'
}

export const ClientList = ({ viewMode, onEditClick }: ClientListProps) => {
  const { data: clients, isLoading, error } = useClients()

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!clients?.length) return <div className="p-4 text-gray-500">Create a first client</div>

  // List view
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto max-h-[70vh]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients?.map((client) => {
              return (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 text-base">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                    <div className="space-x-2 transition-all">
                      <button
                        onClick={() => onEditClick(client)}
                        className="cursor-pointer w-6 text-gray-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracurrentColorerCarrier"
                            stroke-linecurrentcap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_icurrentColoronCarrier">
                            {' '}
                            <path
                              d="M2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12V10.5M13.5 2H12C7.28595 2 4.92893 2 3.46447 3.46447C2.49073 4.43821 2.16444 5.80655 2.0551 8"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecurrentcap="round"
                            ></path>{' '}
                            <path
                              d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L17.5625 10.3304M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecurrentcap="round"
                            ></path>{' '}
                          </g>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Grid view
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients?.map((client) => {
        return (
          <div
            key={client.id}
            className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow relative group"
          >
            <h3 className="pr-18 text-xl font-bold text-gray-800">{client.name}</h3>

            <div className="absolute top-6 right-6 opacity-0 space-x-2 group-hover:opacity-100 transition-all">
              <button
                onClick={() => onEditClick(client)}
                className="cursor-pointer w-6 text-gray-400 hover:text-blue-600"
                title="Edit"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracurrentColorerCarrier"
                    stroke-linecurrentcap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_icurrentColoronCarrier">
                    {' '}
                    <path
                      d="M2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12V10.5M13.5 2H12C7.28595 2 4.92893 2 3.46447 3.46447C2.49073 4.43821 2.16444 5.80655 2.0551 8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecurrentcap="round"
                    ></path>{' '}
                    <path
                      d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L17.5625 10.3304M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecurrentcap="round"
                    ></path>{' '}
                  </g>
                </svg>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
