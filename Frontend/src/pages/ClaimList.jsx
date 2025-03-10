import { useEffect, useState } from "react";
import { getClaims } from "../api/claimsApi";
import { Calendar, Phone, Mail, User, Tag, DollarSign, FileText, AlertCircle } from "lucide-react"

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true)
      const data = await getClaims()
      setClaims(data)
    } catch (error) {
      console.error("Error fetching claims:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getClaimTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "medical":
        return "bg-blue-100 text-blue-800"
      case "property":
        return "bg-green-100 text-green-800"
      case "travel":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  return (
<div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex items-center justify-center mb-8">
        <FileText className="h-8 w-8 text-primary mr-2" />
        <h2 className="text-3xl font-bold text-gray-800">Your Claims</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : claims.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg border border-muted">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">No claims found.</p>
          <p className="text-sm text-muted-foreground mt-2">Submit a new claim to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white p-6 shadow-lg rounded-lg border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  {claim.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getClaimTypeColor(claim.claimType)}`}>
                  {claim.claimType}
                </span>
              </div>

              <div className="space-y-3 text-gray-600">
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {claim.email}
                </p>

                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {claim.phone}
                </p>

                <p className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium">Claim Type:</span> {claim.claimType}
                </p>

                <p className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium">Amount:</span>
                  <span className="text-primary font-bold ml-1">₹{claim.claimAmount}</span>
                </p>

                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-1">Description:</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{claim.claimDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t">
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      {formatDate(claim?.startDate)}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      {formatDate(claim?.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClaimList;
