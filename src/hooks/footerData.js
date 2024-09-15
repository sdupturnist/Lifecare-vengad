
import { wordpressGraphQlApiUrl } from '@/utils/variables';
import { useEffect, useState } from 'react';

export const FooterData = (initialData) => {
    const [dataFooter, setDataFooter] = useState(initialData);
    const [errorFooter, setErrorFooter] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch( wordpressGraphQlApiUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      query: ` query Posts {
                        allContactInfos {
                          edges {
                            node {
                              content
                              contactInfoAcf {
                                address
                                email
                                facebook
                                fieldGroupName
                                instagram
                                phone
                              }
                            }
                          }
                        }
                  }
                        `,
                    }),
                    next: { revalidate: 10 },
                  },
                    {
                      cache: 'force-cache',
                      cache: 'no-store'
                    });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();

                
                setDataFooter(data);
                //console.log(data)
            } catch (error) {
                setErrorFooter(error.message);
            }
        };

        if (!initialData) {
            fetchData();
        }
    }, [initialData]);

    return { dataFooter, errorFooter };
};
