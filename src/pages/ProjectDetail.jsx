import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, MapPin, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useData();
  const { t } = useLanguage();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (data?.projects && id) {
      const found = data.projects.find(p => p.id === parseInt(id));
      if (found) {
        setProject(found);
      }
    }
  }, [data, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  if (!project && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.common.projectNotFound}</h2>
        <button 
          onClick={() => navigate('/project')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> {t.common.backToPortfolio}
        </button>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="pt-20 md:pt-32 pb-12 sm:pb-20 bg-gray-50 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/project')}
          className="mb-6 sm:mb-8 inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-[var(--primary-blue)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {t.common.backToPortfolio}
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Hero Image */}
          <div className="relative h-56 sm:h-72 md:h-96 w-full">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[var(--accent-gold)] text-[var(--primary-dark)] text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md z-10">
              {project.category}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
              <div className="p-4 sm:p-6 md:p-8 w-full">
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-md break-words">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="p-5 sm:p-8 md:p-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">{t.projectPage.projectDesc}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>
                
                {project.details && (
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">{t.projectPage.workDetails}</h2>
                    <ul className="space-y-3">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-[var(--primary-blue)] mr-3 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit space-y-6">
                <h3 className="text-xl font-bold text-[var(--primary-dark)] border-b border-gray-200 pb-4">
                  {t.projectPage.projectInfo}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building2 className="w-6 h-6 text-[var(--primary-blue)] mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t.projectPage.clientLabel}</p>
                      <p className="font-semibold text-gray-800">{project.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[var(--primary-blue)] mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t.projectPage.locationLabel}</p>
                      <p className="font-semibold text-gray-800">{project.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="w-6 h-6 text-[var(--primary-blue)] mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t.projectPage.yearLabel}</p>
                      <p className="font-semibold text-gray-800">{project.year}</p>
                    </div>
                  </div>
                  
                  {project.status && (
                     <div className="flex items-start">
                     <CheckCircle2 className="w-6 h-6 text-[var(--primary-blue)] mr-4 flex-shrink-0" />
                     <div>
                       <p className="text-sm text-gray-500 font-medium">{t.projectPage.statusLabel}</p>
                       <p className="font-semibold text-gray-800">{project.status}</p>
                     </div>
                   </div>
                  )}
                </div>
                
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <Link to="/contact" className="btn-primary w-full text-center block">
                    {t.common.interestedCta}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}