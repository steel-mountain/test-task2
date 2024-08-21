import { useCallback, useState } from "react";
import ListCompany from "../../components/listCompany/ListCompany";
import ModalCompany from "../../components/modalCompany/ModalCompany";
import { ICompany } from "../../models/company";

const Companies: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<ICompany>();

  const handleAddCompany = () => {
    setEditCompany(undefined);
    setIsModalOpen(true);
  };

  const handleEditCompany = useCallback((company: ICompany) => {
    setEditCompany(company);
    setIsModalOpen(true);
  }, []);

  return (
    <section>
      <div className="relative overflow-x-auto">
        <div className="ml-[10px] mb-[15px]">
          <button
            onClick={handleAddCompany}
            className="p-[10px] bg-[#67A5FF] text-white rounded hover:transition-all hover:duration-500 hover:scale-105"
          >
            Добавить компанию
          </button>
        </div>
        <ListCompany handleEditCompany={handleEditCompany} />
      </div>
      {isModalOpen && (
        <ModalCompany
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          company={editCompany}
        />
      )}
    </section>
  );
};

export default Companies;
