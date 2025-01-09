'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pill, Stethoscope, AlertTriangle, Building2, Search, Loader2 } from 'lucide-react'
import Navigation from './Navigation'
// Custom styled components
const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white/90 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`px-6 pb-6 ${className}`} {...props}>
    {children}
  </div>
)

const Button = ({ children, className = '', disabled, ...props }) => (
  <button
    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} 
    ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-4 py-2 text-lg bg-transparent focus:outline-none ${className}`}
    {...props}
  />
)

const TabsList = ({ children, className = '', ...props }) => (
  <div className={`grid grid-cols-2 p-1 rounded-full bg-blue-100/50 ${className}`} {...props}>
    {children}
  </div>
)

const TabsTrigger = ({ active, children, className = '', ...props }) => (
  <button
    className={`py-2 rounded-full transition-all duration-300 
    ${active ? 'bg-white shadow-lg' : 'hover:bg-white/50'} 
    ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Alert = ({ children, variant = 'default', className = '', ...props }) => (
  <div
    className={`p-4 rounded-2xl ${
      variant === 'destructive' ? 'bg-red-50 text-red-900' : 'bg-white'
    } ${className}`}
    {...props}
  >
    {children}
  </div>
)

const drugInformation = [
  {
    title: "What are Prescription Drugs?",
    content: "Prescription drugs are medications that legally require a prescription from a healthcare provider. They are regulated by the FDA and are designed to treat specific medical conditions.",
    icon: Pill
  },
  {
    title: "Important Considerations",
    content: "Always consult with a healthcare provider before starting any medication. Never share prescriptions with others or take medication not prescribed to you.",
    icon: AlertTriangle
  },
  {
    title: "Pros of Proper Medication Use",
    items: [
      "Effective treatment of medical conditions",
      "Improved quality of life",
      "Prevention of disease progression",
      "Management of chronic conditions",
      "Relief from symptoms"
    ],
    icon: Stethoscope
  },
  {
    title: "Cons and Risks",
    items: [
      "Potential side effects",
      "Risk of drug interactions",
      "Possibility of dependency",
      "Cost considerations",
      "Need for regular monitoring"
    ],
    icon: AlertTriangle
  }
]

export default function DrugInfoSearch() {
  const [drugName, setDrugName] = useState('')
  const [drugInfo, setDrugInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('info')

  const handleSearch = async () => {
    if (!drugName) return
    
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drugName}&limit=1`
      )
      const data = await response.json()
      if (data.results) {
        setDrugInfo(data.results[0])
        setActiveTab('results')
      } else {
        setError('No drug found with that name.')
      }
    } catch (err) {
      setError('Failed to fetch drug data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
    <Navigation/>
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100  p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <div className="inline-flex pt-20 rounded-full ">
            <Pill className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Drug Information Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for detailed information about prescription medications, including uses, warnings, and manufacturer details.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2 border-blue-100 rounded-full">
            <CardContent className="py-3 px-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter drug name (e.g., Aspirin, Ibuprofen)"
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                />
                <Button 
                  onClick={handleSearch}
                  disabled={loading || !drugName}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="space-y-4">
          <TabsList>
            <TabsTrigger 
              active={activeTab === 'info'}
              onClick={() => setActiveTab('info')}
            >
              General Information
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'results'}
              onClick={() => setActiveTab('results')}
            >
              Search Results
            </TabsTrigger>
          </TabsList>

          {/* General Information Content */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              {drugInformation.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        {section.icon && <section.icon className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div className="font-semibold text-xl">{section.title}</div>
                    </CardHeader>
                    <CardContent>
                      {section.content ? (
                        <p className="text-gray-600">{section.content}</p>
                      ) : (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.items?.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1) }}
                              className="text-gray-600"
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Search Results Content */}
          {activeTab === 'results' && (
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant="destructive">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <div>
                        <div className="font-semibold">Error</div>
                        <div>{error}</div>
                      </div>
                    </div>
                  </Alert>
                </motion.div>
              )}

              {drugInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Drug Name and Basic Info */}
                  <Card>
                    <CardHeader>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        {drugInfo.openfda.brand_name?.[0]}
                      </div>
                      <div className="text-gray-500">{drugInfo.openfda.generic_name?.[0]}</div>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Manufacturer: {drugInfo.openfda.manufacturer_name?.[0]}</span>
                      </motion.div>
                    </CardContent>
                  </Card>

                  {/* Usage Information */}
                  {drugInfo.indications_and_usage && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2 font-semibold text-xl">
                            <Stethoscope className="w-5 h-5 text-blue-500" />
                            Uses and Indications
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-blue max-w-none">
                            <p>{drugInfo.indications_and_usage[0]}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Warnings */}
                  {drugInfo.warnings && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="border-red-100">
                        <CardHeader>
                          <div className="flex items-center gap-2 font-semibold text-xl text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            Important Warnings
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-red max-w-none">
                            <p>{drugInfo.warnings[0]}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Dosage Information */}
                  {drugInfo.dosage_and_administration && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2 font-semibold text-xl">
                            <Pill className="w-5 h-5 text-blue-500" />
                            Dosage & Administration
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-blue max-w-none">
                            <p>{drugInfo.dosage_and_administration[0]}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

